const { spawn } = require("child_process");
import db from "src/server/model/index";
import * as Messages from "src/server/serverConfig/messages";

class ProjectDomainController {
  constructor() {
    this.isUpdating = false;
  }

  async createNginxConfig(domainUrl) {
    return new Promise((resolve, reject) => {
      try {
        const child = spawn(
          `sudo echo "

        server {
            server_name ${domainUrl};
            client_max_body_size 30M;
            
            location /{
                proxy_pass http://127.0.0.1:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade \\$http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host \\$host;
                proxy_cache_bypass \\$http_upgrade; 
            }
        }
        
        " > /etc/nginx/sites-available/${domainUrl}`,
          { shell: true }
        );
        child.stdout.on("data", (data) => {
          // this is where we can track progress and sent to firebase client
          // this.sendUpdatesToClient("Info", data.toString());
          console.log("createNginxConfig : ", data.toString());
        });

        child.stderr.on("data", (data) => {
          // this.sendUpdatesToClient("Error", data.toString());
          console.error("createNginxConfig : ", data.toString());
        });

        child.on("exit", (code) => {
          if (code == 0) {
            resolve("nginx configuration created");
            return;
          }
          reject("could not create nginx configuration");
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async createSymbolicLinkOfNginxConfig(domainUrl) {
    return new Promise((resolve, reject) => {
      try {
        const child = spawn(
          `sudo ln -s /etc/nginx/sites-available/${domainUrl} /etc/nginx/sites-enabled/`,
          { shell: true }
        );
        child.stdout.on("data", (data) => {
          // this is where we can track progress and sent to firebase client
          // this.sendUpdatesToClient("Info", data.toString());
          console.log("createSymbolicLinkOfNginxConfig : ", data.toString());
        });

        child.stderr.on("data", (data) => {
          // this.sendUpdatesToClient("Error", data.toString());
          console.error("createSymbolicLinkOfNginxConfig : ", data.toString());
        });

        child.on("exit", (code) => {
          if (code == 0) {
            resolve("symbolic link created");
            return;
          }
          reject("could not create symbolic link");
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async reloadNginx() {
    return new Promise((resolve, reject) => {
      try {
        const child = spawn(`sudo systemctl reload nginx`, { shell: true });
        child.stdout.on("data", (data) => {
          // this is where we can track progress and sent to firebase client
          // this.sendUpdatesToClient("Info", data.toString());
          console.log("reloadNginx : ", data.toString());
        });

        child.stderr.on("data", (data) => {
          // this.sendUpdatesToClient("Error", data.toString());
          console.error("reloadNginx : ", data.toString());
        });

        child.on("exit", (code) => {
          if (code == 0) {
            resolve("nginx reloaded");
            return;
          }
          reject("could not reload nginx");
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async runCertbotOndomainNginx(domainUrl) {
    return new Promise((resolve, reject) => {
      try {
        const child = spawn(
          `sudo certbot --nginx -d ${domainUrl} -n --agree-tos -m info@protoflow.ai --redirect`,
          { shell: true }
        );
        child.stdout.on("data", (data) => {
          // this is where we can track progress and sent to firebase client
          // this.sendUpdatesToClient("Info", data.toString());
          console.log("runCertbotOndomainNginx : ", data.toString());
        });

        child.stderr.on("data", (data) => {
          // this.sendUpdatesToClient("Error", data.toString());
          console.error("runCertbotOndomainNginx : ", data.toString());
        });

        child.on("exit", (code) => {
          if (code == 0) {
            resolve("certbot successfully configured");
            return;
          }
          reject("could not configure certbot");
        });
      } catch (error) {
        // if some error occur then clean the nginx config files created
        this.clearnIfErrored(domainUrl)
          .then((res) => {})
          .catch((err) => {});
        reject(error.message);
      }
    });
  }

  async clearnIfErrored(domainUrl) {
    let clearFileCommand = `sudo rm /etc/nginx/sites-available/${domainUrl} && sudo rm /etc/nginx/sites-enabled/${domainUrl}`;
    return new Promise((resolve, reject) => {
      try {
        const child = spawn(clearFileCommand, { shell: true });
        child.stdout.on("data", (data) => {
          // this is where we can track progress and sent to firebase client
          // this.sendUpdatesToClient("Info", data.toString());
          console.log("clearnIfErrored : ", data.toString());
        });

        child.stderr.on("data", (data) => {
          // this.sendUpdatesToClient("Error", data.toString());
          console.error("clearnIfErrored : ", data.toString());
        });

        child.on("exit", (code) => {
          if (code == 0) {
            resolve("certbot successfully configured");
            return;
          }
          reject("could not configure certbot");
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  async initNginxConfigurationForUrl(domainUrl) {
    if (process.env.NODE_ENV == "development")
      throw new Error(Messages.PROJECT_DOMAIN_DEVELOPMENT_ENV);
    if (this.isUpdating)
      throw new Error(Messages.PROJECT_DOMAIN_ALREADY_WORKING);
    // else code
    this.isUpdating = true;
    return new Promise(async (resolve, reject) => {
      try {
        await this.createNginxConfig(domainUrl);
        await this.createSymbolicLinkOfNginxConfig(domainUrl);
        await this.reloadNginx();
        await this.runCertbotOndomainNginx(domainUrl);
        await this.reloadNginx();
        this.isUpdating = false;
        resolve("Nginx configuration successfuly completed");
      } catch (error) {
        this.isUpdating = false;
        reject(error);
      }
    });
  }

  async createProjectDomain(req, callback) {
    try {
      const { domainUrl } = req.body;
      if (!domainUrl) {
        throw new Error(Messages.REQUIRED_FIELDS_EMPTY);
      }
      // create nginx configuration
      await this.initNginxConfigurationForUrl(domainUrl);
      const projectDomains = await db.projectDomain.findOne({ domainUrl });
      if (projectDomains) {
        callback(401, {
          status: 401,
          error: true,
          message: Messages.PROJECT_DOMAIN_ENTRY_EXISTS,
        });
        return;
      }

      await db.projectDomain.create(req.body);

      callback(200, {
        status: 200,
        error: false,
        message: Messages.PROJECT_DOMAIN_ENTRY_SUCCESS,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.PROJECT_DOMAIN_ENTRY_FAILED,
      });
    }
  }

  async getProjectDomain(req, callback) {
    try {
      const { domainUrl } = req.query;
      const domains = await db.projectDomain.find({
        ...(domainUrl && { domainUrl }),
      });
      callback(200, {
        status: 200,
        error: false,
        projectDomains: domains,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.CONNECTION_FAILED,
      });
    }
  }

  async deleteProjectDomain(req, callback) {
    try {
      const domains = await db.projectDomain.deleteMany({});
      callback(200, {
        status: 200,
        error: false,
        projectDomains: domains,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.CONNECTION_FAILED,
      });
    }
  }
}

const projectDomainController = new ProjectDomainController();
module.exports = projectDomainController;
