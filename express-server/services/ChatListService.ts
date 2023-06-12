import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}
  getChatHistory = async (mainUserId: number) => {
    const chatHistory = await this.knex(chatroomTable)
      .select(
        "chatroom.id as chat_room_id",
        "chatroom.updated_at",
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
      .andWhere("users_sender.id", mainUserId)
      .orderBy("chatroom.updated_at", "asc");

    return chatHistory;
  };

  createChat = async (mainUserId: number, targetUserId: number) => {
    const newChat = await this.knex(chatroomTable).insert({
      sender_id: mainUserId,
      receiver_id: targetUserId,
    });

    return newChat;
  };

  deleteChat = async (mainUserId: number, chatId: string) => {
    const deleteChat = await this.knex(chatroomTable)
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", mainUserId)
      .andWhere("id", chatId)
      .first()
      .del();
    return deleteChat;
  };
}
