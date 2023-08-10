import { chatListController } from "../server";
import express from "express";
import { isLoggedIn } from "../guards";

export const chatListRoutes = express.Router();


chatListRoutes.get("/", isLoggedIn, chatListController.lastMessageController);
chatListRoutes.delete(
  "/:chatId",
  isLoggedIn,
  chatListController.deleteChatController
);
