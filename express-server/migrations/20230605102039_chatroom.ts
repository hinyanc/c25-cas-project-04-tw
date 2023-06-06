import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("chatroom", (table) => {
    table.increments();
    table.string("sender_id").unsigned();
    table.foreign("sender_id").references("users.id");
    table.string("receiver_id").unsigned();
    table.foreign("receiver_id").references("users.id");
    table.string("message").notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("chatroom");
}
