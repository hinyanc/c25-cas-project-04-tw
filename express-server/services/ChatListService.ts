import type { Knex } from "knex";
import { chatroomTable } from "../migrations/20230605101740_users";

export class ChatListService {
  constructor(private knex: Knex) {}
  getChatHistory = async (userId: number) => {};
  createChat = async (userId: number, friendId: number) => {};
  deletChat = async (userId: number, friendId: number) => {};
}
