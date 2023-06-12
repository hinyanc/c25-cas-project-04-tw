import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";
import { userTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}
  getChatHistory = async (mainUserId: number) => {
    const chatHistory = await this.knex(userTable)
      .select("id", "username")
      .whereIn(
        "id",
        this.knex(chatroomTable)
          .select("sender_id")
          .orWhere("receiver_id", mainUserId)
          .distinct()
      );

    // .distinct("users.id", "users.username")
    // .select("chatroom.updated_at", "chatroom.message AS last_message")
    // .innerJoin(chatroomTable, function () {
    //   this.on("users.id", "=", "chatroom.sender_id").orOn(
    //     "users.id",
    //     "=",
    //     "chatroom.receiver_id"
    //   );
    // })
    // .where(function () {
    //   this.where("chatroom.sender_id", mainUserId).orWhere(
    //     "chatroom.receiver_id",
    //     mainUserId
    //   );
    // })
    // .orderBy("chatroom.updated_at", "desc");

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
