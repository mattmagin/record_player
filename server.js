import express from "express";
import path from "path";
import bodyParser from "body-parser";
const socketIO = require("socket.io");
const http = require("http");
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3001", // Allow all origins
    methods: ["GET", "POST"], // Allow these HTTP methods
    credentials: true, // Add this line
  },
  allowEIO3: true,
});
const PORT = 3000;
server.listen(PORT);
console.log("Server is running");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const connections = [];

io.sockets.on("connection", (socket) => {
  // console.log(socket);
  connections.push(socket);
  console.log(" %s sockets is connected", connections.length);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on("rfidCode", (message) => {
    console.log(message);
    console.log("Message is received :", message);
  });
});
