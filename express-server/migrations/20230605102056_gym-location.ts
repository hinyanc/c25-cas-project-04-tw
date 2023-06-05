import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("gym-location", (table) => {
    table.increments();
    table.string("name");
    table.date("date_of_birth");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("gym-location");
}

