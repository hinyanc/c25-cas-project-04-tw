import { ChatListService } from "../services/ChatListService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export class ChatListController {
  constructor(private chatListService: ChatListService) {}

  getChatHistoryController = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  createChatController = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };

  deleteChatController = async (req: Request, res: Response) => {
    try {
    } catch (error) {}
  };
}
