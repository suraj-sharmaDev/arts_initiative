import connectDb from "../../../server/serverUtils/mongoDb";
import firebaseTokenController from "src/server/controller/firebaseToken";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method == "POST") {
    firebaseTokenController
      .createTokenEntry(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "PUT") {
    firebaseTokenController
      .updateTokenEntry(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "GET") {
    firebaseTokenController
      .getTokenEntry(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "DELETE") {
    firebaseTokenController
      .deleteTokenEntry(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  res.status(400).json({ error: true, message: "unknown_request" });
  return;
};

export default connectDb(handler);
