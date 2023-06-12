import type { Knex } from "knex";
// import type { ChatroomType } from "../utils/model";
import { chatroomTable } from "../migrations/20230605101740_users";
import { io } from "../server";
export class MessageService {
  constructor(private knex: Knex) {}

  getAllMessages = async (mainUserId: number, targetUserId: number) => {
    const messagesHistory = await this.knex(chatroomTable)
      .select("message", "sender_id", "receiver_id", "updated_at")
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", targetUserId)
      .orWhere("sender_id", targetUserId)
      .andWhere("receiver_id", mainUserId)
      .orderBy("updated_at");

    return messagesHistory;
  };

  sendMessage = async (
    mainUserId: number,
    targetUserId: number,
    messages: string
  ) => {
    const message = await this.knex(chatroomTable).insert({
      sender_id: mainUserId,
      receiver_id: targetUserId,
      message: messages,
      update_at: new Date(),
    });
    return message;
  };

  deleteMessage = async (
    mainUserId: number,
    targetUserId: number,
    messages: string
  ) => {
    const message = await this.knex(chatroomTable)
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", targetUserId)
      .andWhere("message", messages)
      .del();
    return message;
  };
}
