import connectDb from "../../../server/serverUtils/mongoDb";
import projectDomainController from "src/server/controller/projectDomain";

const handler = async (req, res) => {
  const { method } = req;
  
  if (method == "POST") {
    projectDomainController
      .createProjectDomain(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "GET") {
    projectDomainController
      .getProjectDomain(req, (status, data) => {
        res.status(status).json(data);
      })
      .catch((err) => {
        res.status(500).json({ error: true, message: err.message });
        console.log(err);
      });
    return;
  }

  if (method == "DELETE") {
    projectDomainController
      .deleteProjectDomain(req, (status, data) => {
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
