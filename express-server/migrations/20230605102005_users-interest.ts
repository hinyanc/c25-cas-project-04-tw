import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users_interest", (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users_interest");
}
