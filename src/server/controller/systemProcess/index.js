const { spawn, exec } = require("child_process");
import db from "../../model";
import * as Messages from "../../serverConfig/messages";
import sendPushNotification from "src/server/serverUtils/sendPushNotification";

class SystemProcessController {
  constructor() {
    this.isUpdating = false;
    this.email = null;
    this.fcmToken = null;
  }

  // this function will work on git updates
  async gitPullProcess() {
    return new Promise((resolve, reject) => {
      const child = spawn("git pull", { shell: true });
      child.stdout.on("data", (data) => {
        // this is where we can track progress and sent to firebase client
        this.sendUpdatesToClient("Info", data.toString());
      });

      child.stderr.on("data", (data) => {
        this.sendUpdatesToClient("Error", data.toString());
      });

      child.on("exit", (code) => {
        if (code == 0) {
          resolve("code base updated");
          return;
        }
        reject("could not update code base");
      });
    });
  }

  // this function will install project dependencies
  async npmInstallProcess() {
    return new Promise((resolve, reject) => {
      /**
       * We have to find if user uses npm or yarn for
       * dependency installation.
       * We can check that by finding if there is yarn.lock or
       * package-lock.json file
       * If there are none use npm install
       */
      let command = "npm install";

      exec(
        'find . -maxdepth 1 -name "package-lock.json" -o -name "yarn.lock" ',
        (error, stdout, stderr) => {
          if (error) {
            reject(error.toString());
            return;
          }
          if (stderr) {
            reject(stderr.toString());
            return;
          }
          const lockFiles = stdout.toString().split("\n");
          // remove end item in above array as it is empty string
          lockFiles.pop();
          if (lockFiles.includes("./yarn.lock")) {
            command = "yarn install";
          }
          // use command from above to install dependencies
          const child = spawn(command, { shell: true });
          child.stdout.on("data", (data) => {
            // this is where we can track progress and sent to firebase client
            this.sendUpdatesToClient("Info", data.toString());
          });

          child.stderr.on("data", (data) => {
            this.sendUpdatesToClient("Error", data.toString());
          });

          child.on("exit", (code) => {
            resolve(
              code == 0 ? "Packages installed" : "Could not install package"
            );
          });
        }
      );
    });
  }

  // this function will build the project
  async buildProjectProcess() {
    return new Promise((resolve, reject) => {
      const npm = process.platform === "win32" ? "npm.cmd" : "npm";
      const child = spawn(npm, ["run", "build"], {
        shell: true,
        ...(process.platform === "win32" && {
          env: { NODE_ENV: "production" },
        }),
      });
      child.stdout.on("data", (data) => {
        // this is where we can track progress and sent to firebase client
        this.sendUpdatesToClient("Info", data.toString());
      });

      child.stderr.on("data", (data) => {
        this.sendUpdatesToClient("Error", data.toString());
      });

      child.on("exit", (code) => {
        if (code == 0) {
          resolve("project build successful");
          return;
        }
        reject("could not build project");
      });
    });
  }

  // this function will restart the node server
  async restartProjectProcess() {
    return new Promise((resolve, reject) => {
      const child = spawn("pm2 jlist", { shell: true });
      child.stdout.on("data", (data) => {
        // this is where we can track progress and sent to firebase client
        const listOffiles = JSON.parse(data);
        // if there are no files in pm2 list
        if (listOffiles.length == 0) {
          // tell user to start pm2 using following syntax
          //   exec(`pm2 start npm --name "protoflow_site" -- start`);
        } else {
          exec(`pm2 restart protoflow_site`);
        }
      });

      child.stderr.on("data", (data) => {
        console.log(data.toString());
      });

      child.on("exit", (code) => {
        if (code == 0) {
          resolve("project started successfully");
          return;
        }
        reject("could not restart project", code);
      });
    });
  }

  resetState() {
    this.isUpdating = false;
    this.email = null;
    this.fcmToken = null;
  }

  async sendUpdatesToClient(type = "info", data = "data") {
    // type can be error or info
    if (this.fcmToken) {
      const message = {
        notification: {
          title: type,
          body: "Updates from build process",
        },
        data: {
          updates: data,
        },
      };
      sendPushNotification(message, this.fcmToken);
    }
  }

  // this function is exposed to outside and aggregates all above
  // function
  async updateProject(req, callback) {
    try {
      const { email = null } = req.body;
      this.email = email;
      if (this.isUpdating) {
        // if there already is an pending updation
        // dont do anything
        callback(200, {
          status: 200,
          error: false,
          message: "its already updating",
        });
        return;
      }
      // else start an update process
      this.isUpdating = true;
      // get fcm token of the current user so that we
      // can send him updates
      if (email != null) {
        const user = await db.firebaseToken.findOne({ email });
        this.fcmToken = user?.token;
      }
      const gitStatus = await this.gitPullProcess();
      console.log("checking npm status");
      const npmStatus = await this.npmInstallProcess();
      console.log("checking build status");
      const buildStatus = await this.buildProjectProcess();
      const restartStatus = await this.restartProjectProcess();
      callback(200, {
        status: 200,
        error: false,
        gitStatus,
        npmStatus,
        buildStatus,
        restartStatus,
      });
      this.resetState();
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error?.message || error,
      });
      this.resetState();
    }
  }
}

const systemProcessController = new SystemProcessController();
export default systemProcessController;
