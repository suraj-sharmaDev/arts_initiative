import userController from "../../../server/controller/user";
import connectDb from "../../../server/serverUtils/mongoDb";

const handler = async (req, res) => {
  const { method, query } = req;
  const { service } = query;

  if (method == "GET") {
    if (service == "init") {
      userController
        .initUser(req, (status, data) => {
          res.status(status).json(data);
        })
        .catch((err) => {
          res.status(500).json({ error: true, message: err.message });
          console.log(err);
        });
      return;
    }
    userController
      .getUsers(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }
  if (method == "POST") {
    if (service == "login") {
      userController
        .loginUser(req, (status, data) => {
          res.status(status).json(data);
        })
        .catch((err) => {
          res.status(500).json({ error: true, message: err.message });
          console.log(err);
        });
      return;
    }

    if (service == "signup") {
      userController
        .createUser(req, (status, data) => {
          res.status(status).json(data);
        })
        .catch((err) => {
          res.status(500).json({ error: true, message: err.message });
          console.log(err);
        });
      return;
    }

    res.status(400).json({ error: true, message: "unknown_path" });
    return;
  }
  if (method == "PUT") {
    userController
      .updateUser(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "DELETE") {
    return;
  }
  res.status(500).json({
    status: 500,
    error: true,
    message: "incorrect_request",
  });
};

export default connectDb(handler);
