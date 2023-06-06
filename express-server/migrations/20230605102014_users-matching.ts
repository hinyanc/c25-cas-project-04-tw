import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users_matching", (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("matched_users_id").unsigned();
    table.foreign("matched_users_id").references("users.id");
    table.string("status").defaultTo("requested");
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users_matching");
}


// status:requested and matched