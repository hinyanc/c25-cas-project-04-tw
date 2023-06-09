import type { Knex } from "knex";
// import type { ChatroomType } from "../utils/model";
import { chatroomTable } from "../migrations/20230605101740_users";
const userId = "1";
export class MessageService {
  constructor(private knex: Knex) {}

  getAllMessages = async () => {
    const messagesHistory = await this.knex(chatroomTable)
      .select("message", "updated_at")
      .where("sender_id",userId) 
      .orderBy("updated_at", "desc")
      .first();

    await this.knex(chatroomTable)
      .where("sender_id",userId)


    return messagesHistory;
  };
}
