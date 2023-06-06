import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("gym_location", (table) => {
    table.increments();
    table.boolean("has_membership").notNullable();
    table.string("gym_center");
    table.string("gym_address");
    table.string("gym_location").notNullable();
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("gym_location");
}

