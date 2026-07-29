const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Valaki csatlakozott");

  socket.on("loginData", (data) => {
    console.log("Kapott adat:", data);

    // MINDENKINEK elküldi (telefon → gép)
    io.emit("showData", data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Fut: " + PORT);
});