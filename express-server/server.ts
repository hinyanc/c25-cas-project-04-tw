import cors from "cors";
import express from "express";
import { Server as SocketIO, Socket } from "socket.io";
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
      user:User
    }
  }
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

// Controllers
import { MessageController } from "./controllers/MessageController";

// Services
import { MessageService } from "./services/MessageService";
const messageService = new MessageService(knex);
export const messageController = new MessageController(messageService);

// Route Handlers
import { messageRoutes } from "./routers/messageRoutes";
import { User } from "./utils/model";

app.use("/message", messageRoutes.route);

app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

// socket.io
const generateID = () => Math.random().toString(36).substring(2, 10);

let chatRooms: { id: any; roomName: string; messages: any }[] = [
  // Here is the data structure of each chatroom
  // {
  //  id: generateID(),
  //  name: "Tecky",
  //  messages: [
  //      {
  //          id: generateID(),
  //          text: "React is awesome!",
  //          time: "07:50",
  //          user: "Chinny",
  //      },
  //      {
  //          id: generateID(),
  //          text: "Hi Chinny, I think so!",
  //          time: "08:50",
  //          user: "Julia",
  //      },
  //  ],
  // },
];
io.on("connection", (socket: Socket) => {
  console.log(`${socket.id} user just connected!`);

  socket.on("createRoom", (roomName) => {
    socket.join(roomName);
    // Adds the new group name to the chat rooms array
    chatRooms.unshift({ id: generateID(), roomName, messages: [] });
    // Returns the updated chat rooms via another event
    socket.emit("roomsList", chatRooms);
  });

  socket.on("findRoom", (id) => {
    // Filters the array by the ID
    let result = chatRooms.filter((room) => room.id == id);
    // Sends the messages to the app
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("newMessage", (data) => {
    // Destructures the property from the object
    const { room_id, message, user, timestamp } = data;

    // Finds the room where the message was sent
    let result = chatRooms.filter((room) => room.id == room_id);

    // Create the data structure for the message
    const newMessage = {
      id: generateID(),
      text: message,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    // Updates the chatroom messages
    socket.to(result[0].roomName).emit("roomMessage", newMessage);
    result[0].messages.push(newMessage);

    // Trigger the events to reflect the new changes
    socket.emit("roomsList", chatRooms);
    socket.emit("foundRoom", result[0].messages);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("A user disconnected");
  });
});

app.get("/chat", (req, res) => {
  res.json(chatRooms);
});
