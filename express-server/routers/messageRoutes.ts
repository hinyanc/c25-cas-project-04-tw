import { isLoggedIn } from "../guards";
import { messageController } from "../server";
import express from "express";

export const messageRoutes = express.Router();

messageRoutes.get(
  "/:targetUserId",
  isLoggedIn,
  messageController.getMessageHistoryController
);
messageRoutes.post("/", isLoggedIn, messageController.sendMessageController);
messageRoutes.delete("/:messageId", messageController.deleteMessageController);
