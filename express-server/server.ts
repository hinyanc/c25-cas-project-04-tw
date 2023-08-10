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
export const io = new SocketIO(server);

dotenv.config();

declare global {
  namespace SocketIO {
    interface Socket {
      userId?: number;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password">;
    }
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface OnlineUser {
  userId: string;
  socketId: string;
}

const PORT = 8080;

// Controllers
import { AuthController } from "./controllers/authController";
import { SignUpController } from "./controllers/SignUpController";
import { MessageController } from "./controllers/MessageController";
import { DiscoverController } from "./controllers/discoverController";
import { GoalController } from "./controllers/goalController";
import { ChatListController } from "./controllers/ChatListController";
import { ProfileController } from "./controllers/profileController";
// Services
import { AuthService } from "./services/authService";
import { SignUpService } from "./services/SignUpService";
import { MessageService } from "./services/MessageService";
import { ChatListService } from "./services/ChatListService";
import { DiscoverService } from "./services/discoverService";
import { GoalService } from "./services/goalService";
import { ProfileService } from "./services/profileService";

const authService = new AuthService(knex);
export const authController = new AuthController(authService);

const signUpService = new SignUpService(knex);
export const signUpController = new SignUpController(signUpService);

const messageService = new MessageService(knex);
export const messageController = new MessageController(messageService);

const chatListService = new ChatListService(knex);
export const chatListController = new ChatListController(chatListService);

const discoverService = new DiscoverService(knex);
export const discoverController = new DiscoverController(discoverService);

const goalService = new GoalService(knex);
export const goalController = new GoalController(goalService);

const profileService = new ProfileService(knex);
export const profileController = new ProfileController(profileService);

// Route Handlers
import { messageRoutes } from "./routers/messageRoutes";
import { User } from "./utils/model";
import { authRoutes } from "./routers/authRoutes";
import { signUpRoutes } from "./routers/signUpRoutes";
import { discoverRoutes } from "./routers/discoverRoutes";
import { goalRoutes } from "./routers/goalRoutes";
import { chatListRoutes } from "./routers/chatListRoutes";
import { profileRoutes } from "./routers/profileRoutes";

app.get("/hi", (req, res) => {
  res.send("bye");
});

app.get(
  "/getSocketId/userId/:userId",
  (req: express.Request, res: express.Response) => {
    let targetUserId = req.params.userId;
    // let targetUserId = req.query.userId;
    console.log("targetUserId", targetUserId);

    let found;
    for (let item of userList) {
      console.log("inspect", item);

      if (item.userId == targetUserId) {
        found = item;
        console.log("found", found);
        break;
      }
    }

    console.log("found", found);
    res.json({ socketId: found?.socketId });
  }
);

app.use("/auth", authRoutes);
app.use("/signup", signUpRoutes);
app.use("/message", messageRoutes);
app.use("/chatlist", chatListRoutes);
app.use("/discover", discoverRoutes);
app.use("/goal", goalRoutes);
app.use("/profile", profileRoutes);

app.use("/profile-pic", express.static("./assets/profile_pic"));

export const userList: OnlineUser[] = [];

io.on("connection", async (socket: any) => {
  console.log("a user connected,its socket id is", socket.id);

  socket.on("join", async (payload: { socketId: number; token: string }) => {
    console.log("hi received", payload);
    const user = await authService.decodeToken(payload.token);

    // push the userId into userList
    if (socket.id != undefined && user != undefined) {
      userList.push({ userId: user.id, socketId: socket.id });
      console.log("userList", userList);
    }
  });

  //disconnect
  socket.on("disconnect", function () {
    console.log("Got disconnect!");
    const index = userList.findIndex((user) => user.socketId === socket.id);
    if (index !== -1) {
      userList.splice(index, 1);
    }
    console.log("check user list after user disconnect", userList);
  });

  
});

server.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
