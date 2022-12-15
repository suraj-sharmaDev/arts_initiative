const winston = require("winston");
require("winston-daily-rotate-file");

const dashLog = new winston.transports.DailyRotateFile({
  filename: "./logs/dash-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
});

const dashLogger = winston.createLogger({
  transports: [
    dashLog,
    new winston.transports.Console({
      colorize: true,
    }),
  ],
});

export default dashLogger;