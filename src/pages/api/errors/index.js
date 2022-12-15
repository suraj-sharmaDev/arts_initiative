const fs = require("fs");
const path = require("path");

const rootDir = path.resolve("./");

const handler = async (req, res) => {
  const { method, query } = req;

  if (method == "GET") {
    const { date } = query;
    let logDateFormat = date ? new Date(date) : new Date();
    const logDate = logDateFormat.toISOString().split("T")[0];
    const logFileName = `dash-${logDate}.log`;
    const relativeFilePath = path.join(rootDir, `/logs/${logFileName}`);

    const logData = fs.readFileSync(relativeFilePath, {
      encoding: "utf8",
      flag: "r",
    });
    res.status(200).send(logData);
    return;
  }
  res.status(400).json({ error: true, message: "unknown_request" });
  return;
};

export default handler;
