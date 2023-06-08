import type { Knex } from "knex";

export class MessageService {
  constructor(private knex: Knex) {}
  async create(knex: Knex, message: string) {
    return await knex("messages").insert({ message });
  }

  async getAll(knex: Knex) {
    return await knex("messages").select("*");
  }
}
