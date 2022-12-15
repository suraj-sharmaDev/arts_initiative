// pages/api/serveFile/[name].js

// Tell Next.js to pass in Node.js HTTP
export const config = {
  api: { externalResolver: true },
};

import express from "express";
const handler = express();

const serveFiles = express.static("./public/uploads");
handler.use(["/api/serveFile"], serveFiles);

//               ^
// The first one is used when visiting /api/serveFile.

// express is just a function that takes (http.IncomingMessage, http.ServerResponse),
// which Next.js supports when externalResolver is enabled.

export default handler;
