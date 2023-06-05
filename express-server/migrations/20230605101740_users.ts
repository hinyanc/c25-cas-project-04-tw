import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
      table.increments();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
      table.string("username").notNullable();
      table.integer("goal_id").unsigned();
      table.foreign("goal_id").references("goal.id");
      table.string("profile-pic").notNullable();
      table.date("birthday").notNullable();
      table.string("gender").notNullable();
      table.string("bio").notNullable();
      table.string("height").notNullable();
      table.string("weight").notNullable();
      table.string("gym_level").notNullable();
      table.integer("gym_location_id").unsigned();
      table.foreign("gym_location_id").references("gym_location.id");
      table.boolean("is_pt").defaultTo("false");
      table.integer("pt_id").unsigned();
      table.foreign("pt_id").references("pt.id");
      table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
      await knex.schema.dropTable("users");
}

