import { chatListController } from "../server";
import express from "express";
import { isLoggedIn } from "../guards";

export const chatListRoutes = express.Router();

// chatListRoutes.get("/", chatListController.getChatHistoryController);
chatListRoutes.get("/", isLoggedIn, chatListController.lastMessageController);
// chatListRoutes.post("/", chatListController.createChatController);
chatListRoutes.delete(
  "/:chatId",
  isLoggedIn,
  chatListController.deleteChatController
);
