import db from "../../model";
import * as Messages from "../../serverConfig/messages";
import { appVersion, adminApi } from "src/server/serverConfig/serverConstants";

class UserController {
  constructor() {}

  async createUser(req, callback) {
    try {
      const { email, password, domain } = req.body;
      if (!email || !password) {
        throw new Error("Email and Password required");
      }
      let user = await db.user.findOne({ email });
      if (user) {
        callback(400, {
          status: 400,
          error: true,
          message: Messages.USER_ALREADY_EXISTS,
        });
        return;
      }
      const insertData = { ...req.body, role: "user" };
      user = await db.user.create(insertData);
      callback(200, {
        status: 200,
        error: false,
        message: Messages.USER_CREATED,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: error?.message || Messages.USER_NOT_CREATED,
      });
    }
  }

  async loginUser(req, callback) {
    try {
      const { email, password, domain } = req.body;
      const user = await db.user.findOne({ email, password });
      if (user == null) {
        callback(401, {
          status: 401,
          error: true,
          message: Messages.INCORRECT_CREDENTIAL,
        });
        return;
      }
      callback(200, {
        status: 200,
        error: false,
        message: Messages.LOGIN_SUCCESSFUL,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: Messages.CONNECTION_FAILED,
      });
    }
  }

  async getUsers(req, callback) {
    try {
      const { email, password, key_id, count = 20, page = 1 } = req.query;
      const searchParams = {
        ...(key_id && { _id: key_id }),
        ...(email && { email }),
        ...(password && { password }),
      };
      const user = await db.user
        .find({ ...searchParams })
        .skip((page - 1) * count)
        .limit(count);

      callback(200, {
        status: 200,
        error: false,
        users: user,
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: Messages.CONNECTION_FAILED,
      });
    }
  }

  async initUser(req, callback) {
    try {
      const { email } = req.query;
      if (!email) {
        throw new Error("Email required");
      }
      const user = await db.user.findOne({ email }, "email role");
      callback(200, {
        status: 200,
        error: false,
        data: {
          user,
          appVersion,
        },
      });
    } catch (error) {
      callback(500, {
        status: 500,
        error: true,
        message: Messages.CONNECTION_FAILED,
      });
    }
  }

  async updateUser(req, callback) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error(Messages.REQUIRED_FIELDS_EMPTY);
      }
      await db.user.update({ email }, { password });
      callback(200, {
        status: 200,
        error: false,
        message: Messages.USER_UPDATED,
      });
    } catch (error) {
      console.log(error);
      callback(500, {
        status: 500,
        error: true,
        message: error.message || Messages.CONNECTION_FAILED,
      });
    }
  }
}

const userController = new UserController();
module.exports = userController;
