/******************************************
 *  Author : Suraj Sharma
 *  Created On : Wed Oct 05 2022
 *  File : socket.js
 *******************************************/
import { Server } from "socket.io";
import connectDb from "../../server/serverUtils/mongoDb";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      socket.on("join", (data) => {
        socket.join(data.email);
      });
    });
  }
  res.end();
};

export default connectDb(SocketHandler);
