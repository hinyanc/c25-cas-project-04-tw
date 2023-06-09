import cors from "cors";
import express from "express";
import { Server as SocketIO } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const app = express();
const server = new http.Server(app);
const io = new SocketIO(server);

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

let onlineUsers: string[] = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/demo", express.static("demoClient"));

io.use((socket, next) => {
  console.log("check middle", socket.id);
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected,its socket id is", socket.id);
  socket.emit("syslog", "welcome to the chat");
  onlineUsers.push(socket.id);
  console.log("online users", onlineUsers);

  socket.on("message", (socket) => {
    console.log(
      "receive send request from",
      socket.from,
      "content",
      socket.data,
      "to socket",
      socket.to
    );

    io.to(socket.to).emit("message", {
      data: socket.data,
      from: socket.from,
    });
  });
});

const PORT = 8080;

// Controllers
import { MessageController } from "./controllers/MessageController";
import { DiscoverController } from "./controllers/discoverController";

// Services
import { MessageService } from "./services/MessageService";

const messageService = new MessageService(knex);
export const messageController = new MessageController(messageService);

import { DiscoverService } from "./services/discoverService";
const discoverService = new DiscoverService(knex);
export const discoverController = new DiscoverController(discoverService);

// Route Handlers
import { messageRoutes } from "./routers/messageRoutes";
import { User } from "./utils/model";
import { discoverRoutes } from "./routers/discoverRoutes";


app.use("/message", messageRoutes);
app.use("/discover", discoverRoutes);

server.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
