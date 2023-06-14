import { messageController } from "../server";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.get(
  "/mainUserId/:mainUserId/targetUserId/:targetUserId",
  messageController.getMessageHistoryController
);
messageRoutes.post("/", messageController.sendMessageController);
messageRoutes.delete("/:messageId", messageController.deleteMessageController);
