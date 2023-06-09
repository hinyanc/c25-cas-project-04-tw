import { chatroomController } from "../server";
import express from "express";

export const chatroomRouter = express.Router();

chatroomController.get("/", chatroomController.getChatrooms);
chatroomController.post("/", chatroomController.createChatroom);
chatroomController.delete("/:id", chatroomController.deleteChatroom);
