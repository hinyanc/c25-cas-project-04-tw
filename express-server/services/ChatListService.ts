import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}
  getChatHistory = async (mainUserId: number) => {
    const chatHistory = await this.knex(chatroomTable)
      .select("id")
      .where("sender_id", mainUserId)
      .andWhere("receiver_id", mainUserId)
      .orderBy("created_at", "desc");

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
