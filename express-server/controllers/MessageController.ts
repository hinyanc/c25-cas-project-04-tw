import { MessageService } from "../services/MessageService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";

export class MessageController {
  constructor(private messageService: MessageService) {}

  sendController = async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      const response = await this.messageService.sendMessage(message, +req.user.id);
      res.status(200).json(response);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  
  };
}
