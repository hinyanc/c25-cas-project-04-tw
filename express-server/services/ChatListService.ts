import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}

  getLastMessage = async (mainUserId: number) => {
    const mainUserIdString = mainUserId.toString();
    const rawQuery = await this.knex.raw(`
   WITH q1 AS (
    SELECT receiver_id AS target_user_id, MAX(id) AS max_id
    FROM chatroom
    WHERE sender_id = ${mainUserIdString}
    GROUP BY receiver_id
), q2 AS (
    SELECT sender_id AS target_user_id, MAX(id) AS max_id
    FROM chatroom
    WHERE receiver_id = ${mainUserIdString}
    GROUP BY sender_id
), q3 AS (
    SELECT matched_users_id AS target_user_id
    FROM users_matching
    WHERE users_id = ${mainUserIdString} AND status = 'matched'
    UNION
    SELECT users_id AS target_user_id
    FROM users_matching
    WHERE matched_users_id = ${mainUserIdString} AND status = 'matched'
)
SELECT
    q1.target_user_id,
    users.username AS target_username,
    users.profile_pic AS profile_pic,
    chatroom.message AS last_message,
    chatroom.created_at
FROM
    q1
    LEFT JOIN chatroom ON q1.max_id = chatroom.id
    LEFT JOIN users ON q1.target_user_id = users.id

UNION
SELECT
    q2.target_user_id,
    users.username AS target_username,
    users.profile_pic AS profile_pic,
    chatroom.message AS last_message,
    chatroom.updated_at
FROM
    q2
    LEFT JOIN chatroom ON q2.max_id = chatroom.id
    LEFT JOIN users ON q2.target_user_id = users.id
WHERE
    q2.target_user_id NOT IN (SELECT target_user_id FROM q1)

UNION
SELECT
    target_user_id,
    users.username AS target_username,
    users.profile_pic AS profile_pic,
    null AS last_message,
    null AS created_at
FROM
    q3
    LEFT JOIN users ON q3.target_user_id = users.id
WHERE
    q3.target_user_id NOT IN (SELECT target_user_id FROM q1)
    AND q3.target_user_id NOT IN (SELECT target_user_id FROM q2);
  `);

    return rawQuery.rows;
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
