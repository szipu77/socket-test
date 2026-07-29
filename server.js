const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let lampOn = false;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("state", lampOn);

  socket.on("toggle", () => {
    lampOn = !lampOn;
    io.emit("state", lampOn);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Fut a szerver");
});