import { ChatListService } from "../services/ChatListService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export class ChatListController {
  constructor(private chatListService: ChatListService) {}

  getChatHistoryController = async (req: Request, res: Response) => {
    try {
      const { mainUserId } = req.body;
      const chatHistory = await this.chatListService.getChatHistory(mainUserId);
      res.status(200).json(chatHistory);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  createChatController = async (req: Request, res: Response) => {
    try {
      const { mainUserId, targetUserId } = req.body;
      const newChat = await this.chatListService.createChat(
        mainUserId,
        targetUserId
      );
      res.status(200).json(newChat);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteChatController = async (req: Request, res: Response) => {
    try {
      const { mainUserId } = req.body;
      const { chatId } = req.params;
      const deletedChat = await this.chatListService.deleteChat(
        mainUserId,
        chatId
      );
      res.status(200).json(deletedChat);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
