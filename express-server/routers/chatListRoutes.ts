import { chatListController } from "../server";
import express from "express";

export const chatListRoutes = express.Router();

// chatListRoutes.get("/", chatListController.getChatHistoryController);
chatListRoutes.get("/", chatListController.lastMessageController);
chatListRoutes.post("/", chatListController.createChatController);
chatListRoutes.delete("/:chatId", chatListController.deleteChatController);
