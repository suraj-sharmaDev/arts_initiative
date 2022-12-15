const mongoose = require("mongoose");
const config = require("../serverConfig/serverConstants");

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // use current db connection
    return handler(req, res);
  }
  // use new db connection
  await mongoose.connect(config.dbUrl);
  return handler(req, res);
}

export default connectDb;