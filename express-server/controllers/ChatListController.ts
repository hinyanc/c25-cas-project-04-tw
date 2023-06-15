import { ChatListService } from "../services/ChatListService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export class ChatListController {
  constructor(private chatListService: ChatListService) {}

  lastMessageController = async (req: Request, res: Response) => {
    try {
      const mainUserId  = req.user?.id;
      const lastMessage = await this.chatListService.getLastMessage(
        mainUserId!
      );
      console.log("last message", lastMessage);
      res.status(200).json(lastMessage);
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
