import { chatListController } from "../server";
import express from "express";

export const chatListRouter = express.Router();

chatListRouter.get("/", chatListController.getChatHistoryController);
chatListRouter.post("/", chatListController.createChatController);
chatListRouter.delete("/:chatId", chatListController.deleteChatController);
