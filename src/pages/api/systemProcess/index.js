import connectDb from "../../../server/serverUtils/mongoDb";
import systemProcessController from "src/server/controller/systemProcess";
import Cors from "cors";
import initMiddleware from "src/client/helpers/initMiddleware";

/**
 *
 * @param {*} req
 * @param {*} res
 *
 * This api will execute child processes
 */

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  const { method } = req;

  await cors(req, res);
  
  if (method == "POST") {
    systemProcessController
      .updateProject(req, (status, data) => {
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
