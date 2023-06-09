import { MessageService } from "../services/MessageService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
export class MessageController {
  constructor(private messageService: MessageService) {}

  getAllMessageController = async (req: Request, res: Response) => {
    try {
      const userId = req.user_id!;
      const messagesHistory = await this.messageService.getAllMessages(
        
      );
      res.status(200).json(messagesHistory);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
