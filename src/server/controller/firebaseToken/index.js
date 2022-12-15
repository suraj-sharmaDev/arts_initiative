import db from "../../model";
import * as Messages from "../../serverConfig/messages";
import sendPushNotification from "src/server/serverUtils/sendPushNotification";
import { adminApi } from "src/server/serverConfig/serverConstants";

class FirebaseTokenController {
  constructor() {}

  async createTokenEntry(req, callback) {
    try {
      const { email, domain, token } = req.body;
      if (!email || !token) {
        throw new Error(Messages.REQUIRED_FIELDS_EMPTY);
      }
      let user = await db.firebaseToken.findOne({ email });
      if (user) {
        // if it already exists update token data
        this.updateTokenEntry(req, callback);
        return;
      }

      user = await db.firebaseToken.create(req.body);
      // send firebase token to central admin
      if (process.env.NODE_ENV == "production" && domain) {
        await fetch(`${adminApi}/api/client`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            domain,
            firebaseToken: token,
          }),
        });
      }

      callback(200, {
        status: 200,
        error: false,
        message: Messages.FIREBASE_ENTRY_SUCCESSFUL,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.FIREBASE_ENTRY_FAILED,
      });
    }
  }

  async updateTokenEntry(req, callback) {
    try {
      const { email, domain, token } = req.body;
      if (!email || !token) {
        throw new Error(Messages.REQUIRED_FIELDS_EMPTY);
      }
      let user = await db.firebaseToken.findOne({ email });
      if (user == null) {
        callback(401, {
          status: 401,
          error: true,
          message: Messages.FIREBASE_ENTRY_NOT_FOUND,
        });
        return;
      }

      user = await db.firebaseToken.update({ email }, { token });

      // send firebase token to central admin
      if (process.env.NODE_ENV == "production" && domain) {
        await fetch(`${adminApi}/api/client`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            domain,
            firebaseToken: token,
          }),
        }).catch((err) => {
          // sentry log the err
          console.error("admmin firebase update error");
        });
      }

      callback(200, {
        status: 200,
        error: false,
        message: Messages.FIREBASE_ENTRY_UPDATE_SUCCESSFUL,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.FIREBASE_ENTRY_UPDATE_FAILED,
      });
    }
    return;
  }

  async getTokenEntry(req, callback) {
    try {
      const { email, count = 20, page = 1 } = req.query;
      const searchParams = {
        ...(email && { email }),
      };
      const user = await db.firebaseToken
        .find({ ...searchParams })
        .skip((page - 1) * count)
        .limit(count)
        .sort({ updatedAt: -1 });

      callback(200, {
        status: 200,
        error: false,
        users: user,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.CONNECTION_FAILED,
      });
    }
  }

  async deleteTokenEntry(req, callback) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new Error(Messages.REQUIRED_FIELDS_EMPTY);
      }
      let user = await db.firebaseToken.findOne({ email });
      if (user == null) {
        callback(401, {
          status: 401,
          error: true,
          message: Messages.FIREBASE_ENTRY_NOT_FOUND,
        });
        return;
      }
      const _id = user?._id;
      await db.firebaseToken.findByIdAndDelete(_id);
      callback(200, {
        status: 200,
        error: false,
        message: Messages.FIREBASE_ENTRY_DELETE_SUCCESSFUL,
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

const firebaseTokenController = new FirebaseTokenController();
export default firebaseTokenController;
