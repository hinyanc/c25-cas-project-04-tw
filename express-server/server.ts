// import cors from "cors";
import express from "express";
import { Server as SocketIO } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import Knex from "knex";
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const app = express();
const server = new http.Server(app);
export const io = new SocketIO(server);

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User,'password'>
    }
  }
}
//

let onlineUsers: string[] = [];

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/demo", express.static("demoClient"));
// app.use(
//   expressSession({
//     secret: "group 4 is the best",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// custom client ID
// io.engine.generateId = (req: any) => {
//   const userId = req.session.userId;
//   if (userId) {
//     return `custom-client-id-${userId}`;
//   }
//   return `custom-client-id-default`;
// };

// io.on("connect", function (req: any) {
//   const userId = req.session.userId;
//   console.log(socket.io.engine.id); // old ID
//   socket.io.engine.id = userId;
//   console.log(socket.io.engine.id); // new ID
// });

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
import { AuthController } from "./controllers/authController";
import { MessageController } from "./controllers/MessageController";
import { DiscoverController } from "./controllers/discoverController";
import { GoalController } from "./controllers/goalController";

import { ChatListController } from "./controllers/ChatListController";
// Services
import { AuthService } from "./services/authService";
import { MessageService } from "./services/MessageService";
import { ChatListService } from "./services/ChatListService";
import { DiscoverService } from "./services/discoverService";

const authService = new AuthService(knex);
export const authController = new AuthController(authService);

const messageService = new MessageService(knex);
export const messageController = new MessageController(messageService);

const chatListService = new ChatListService(knex);
export const chatListController = new ChatListController(chatListService);

const discoverService = new DiscoverService(knex);
export const discoverController = new DiscoverController(discoverService);

import { GoalService } from "./services/goalService";
const goalService = new GoalService(knex);
export const goalController = new GoalController(goalService);

// Route Handlers
import { messageRoutes } from "./routers/messageRoutes";
import { User } from "./utils/model";
import { authRoutes } from './routers/authRoutes'
import { discoverRoutes } from "./routers/discoverRoutes";
import { goalRoutes } from "./routers/goalRoutes";
import { chatListRoutes } from "./routers/chatListRoutes";
// import expressSession from "express-session";

app.get("/hi", (req, res) => {
  res.send("bye");
});

app.use('/auth', authRoutes)
app.use("/message", messageRoutes);
app.use("/message", messageRoutes);
app.use("/chatlist", chatListRoutes);
app.use("/discover", discoverRoutes);
app.use("/goal", goalRoutes);

app.use("/profile-pic", express.static('./assets/profile_pic'))

server.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
