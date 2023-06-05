import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users-interest", (table) => {
    table.increments();
    table.string("name");
    table.date("date_of_birth");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users-interest");
}
