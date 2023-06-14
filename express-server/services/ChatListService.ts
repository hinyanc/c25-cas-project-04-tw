import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";
// import { userTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}
  // getChatHistory = async (mainUserId: number) => {
  //   const chatHistory = await this.knex(userTable)
  //     .select("id", "username")
  //     .whereIn(
  //       "id",
  //       this.knex(chatroomTable)
  //         .select("sender_id")
  //         .orWhere("receiver_id", mainUserId)
  //         .distinct()
  //     );
  //   return chatHistory;
  // };

  getLastMessage = async (mainUserId: number) => {
    const mainUserIdString = mainUserId.toString();

    const rawQuery = `
            SELECT DISTINCT ON (users.id)
        users.id AS user_id,
        users.username AS user_username,
        users.profile_pic,
        chatroom.message,
        chatroom.updated_at
      FROM users
      LEFT JOIN chatroom ON (
        (users.id = chatroom.sender_id AND chatroom.receiver_id = '${mainUserIdString}') OR
        (users.id = chatroom.receiver_id AND chatroom.sender_id = '${mainUserIdString}')
      )
      AND chatroom.updated_at = (
        SELECT MAX(updated_at)
        FROM chatroom AS subquery
        WHERE
          (subquery.sender_id = users.id AND subquery.receiver_id = '${mainUserIdString}')
          OR
          (subquery.sender_id = '${mainUserIdString}' AND subquery.receiver_id = users.id)
      )
      ORDER BY users.id ASC, chatroom.updated_at DESC;
    `;

    const lastMessage = await this.knex.raw(rawQuery);

    const filteredLastMessage = lastMessage.rows.filter(
      (row: { message: string; updated_at: Date; profile_pic: string }) =>
        row.message !== null && row.updated_at !== null
    );

    return filteredLastMessage;
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
