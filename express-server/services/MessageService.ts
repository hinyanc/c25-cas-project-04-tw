import type { Knex } from "knex";
// import type { ChatroomType } from "../utils/model";
import { chatroomTable } from "../migrations/20230605101740_users";
// import { io } from "../server";
export class MessageService {
  constructor(private knex: Knex) {}

  getAllMessages = async (mainUserId: number, targetUserId: number) => {
    const messagesHistory = await this.knex(chatroomTable)
      .select(
        "chatroom.sender_id",
        "chatroom.receiver_id",
        "chatroom.created_at",
        "chatroom.message",
        "users_sender.username as sender_username",
        "users_receiver.username as receiver_username"
      )
      .leftJoin(
        "users as users_sender",
        "chatroom.sender_id",
        "users_sender.id"
      )
      .leftJoin(
        "users as users_receiver",
        "chatroom.receiver_id",
        "users_receiver.id"
      )
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", targetUserId)
      .orWhere("sender_id", targetUserId)
      .andWhere("receiver_id", mainUserId)
      .orderBy("created_at");

    return messagesHistory;
  };

  sendMessage = async (
    mainUserId: number,
    targetUserId: number,
    messagesId: string
  ) => {
    const message = await this.knex(chatroomTable).insert({
      sender_id: mainUserId,
      receiver_id: targetUserId,
      message: messagesId,
    });
    return message;
  };

  deleteMessage = async (
    mainUserId: number,
    targetUserId: number,
    messagesId: string
  ) => {
    const message = await this.knex(chatroomTable)
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", targetUserId)
      .andWhere("message", messagesId)
      .first()
      .del();
    return message;
  };
}
