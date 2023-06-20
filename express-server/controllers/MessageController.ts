import { MessageService } from "../services/MessageService";
import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { io } from "../server";
import { userList } from "../server";
export class MessageController {
  constructor(private messageService: MessageService) {}

  getMessageHistoryController = async (req: Request, res: Response) => {
    try {
      console.log("messagesHistory");
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
    console.log(
      "create message controller",
      "message is",
      req.body.message,
      "target user id is",
      req.body.targetUserId
    );
    try {
      //@ts-ignore
      const mainUserId = req.user?.id;
      const { message, targetUserId } = req.body;
      console.log("check body", message, targetUserId);
      console.log("check userList", userList);
      let target = userList.find((item) => item.userId == targetUserId);
      if (target) {
        console.log(
          "check target",
          target.socketId,
          "its userId is",
          target.userId
        );

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
