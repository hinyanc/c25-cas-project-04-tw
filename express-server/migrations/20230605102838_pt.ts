import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("pt", (table) => {
    table.increments();
    table.string("certification");
    table.integer("hourly_rate");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("pt");
}
