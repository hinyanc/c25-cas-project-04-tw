import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("goal", (table) => {
    table.increments();
    table.string("ongoing_task").notNullable();
    table.string("completed_task").notNullable();
    table.string("bmi").notNullable();
    table.string("target_weight");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("goal");
}

