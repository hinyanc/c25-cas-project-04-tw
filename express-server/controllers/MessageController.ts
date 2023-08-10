import { MessageService } from "../services/MessageService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { io } from "../server";
import { userList } from "../server";
export class MessageController {
  constructor(private messageService: MessageService) {}

  getMessageHistoryController = async (req: Request, res: Response) => {
    try {
      const mainUserId = req.user?.id;
      const { targetUserId } = req.params;

      const messagesHistory = await this.messageService.getAllMessages(
        mainUserId!,
        parseInt(targetUserId)
      );
      res.status(200).json(messagesHistory);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  sendMessageController = async (req: Request, res: Response) => {
    try {
      //@ts-ignore
      const mainUserId = req.user?.id;
      const { message, targetUserId } = req.body;
      let target = userList.find((item) => item.userId == targetUserId);
      if (target) {

        io.to(target.socketId).emit("confirm", {
          message: message,
        });
      }

      await this.messageService.sendMessage(mainUserId!, targetUserId, message);
      res.status(200).json("Success send message");
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteMessageController = async (req: Request, res: Response) => {
    try {
      const { mainUserId } = req.body;
      const { message, targetUserId } = req.body;
      const messageDeleted = await this.messageService.deleteMessage(
        mainUserId,
        targetUserId,
        message
      );
      res.status(200).json(messageDeleted);
    } catch (error) {}
  };
}
