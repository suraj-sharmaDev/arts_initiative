// load all env variables
require("dotenv").config();

const config = {
  development: {
    dbUrl: "mongodb://127.0.0.1:27017/arts_initiative",
  },
  production: {
    dbUrl:
      "mongodb+srv://arts_initiative:CmTUgf7gumGG4nyU@cluster0.2vpapoc.mongodb.net/arts_initiative?retryWrites=true&w=majority",
  },
};

const currentMethod = process.env.NODE_ENV;

// version of app
const appVersion = "1.0.0";

module.exports = {
  ...config[currentMethod],
  appVersion,
};
