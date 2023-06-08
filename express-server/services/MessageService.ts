import type { Knex } from "knex";

export class MessageService {
  constructor(private knex: Knex) {}
  async sendMessage(knex: Knex, message: number) {
    return await knex("messages").insert({ message });
  }

  async getAll(knex: Knex) {
    return await knex("messages").select("*");
  }
}
