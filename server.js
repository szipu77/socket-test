const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static(__dirname));

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("send", (msg) => {
    io.emit("receive", msg);
  });
});

server.listen(3000, () => {
  console.log("Fut a szerver");
});