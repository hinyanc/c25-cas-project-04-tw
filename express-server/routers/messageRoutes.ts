import { messageController } from "../server";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.get("/", messageController.getMessageHistoryController);
messageRoutes.post("/", messageController.sendMessageController);
messageRoutes.delete("/:messageId", messageController.deleteMessageController);