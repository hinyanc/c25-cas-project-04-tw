import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("pt", (table) => {
    table.increments();
    table.string("certification");
    table.integer("hourly_rate");
    table.timestamps(false, true);
  });

  await knex.schema.createTable("gym_location", (table) => {
    table.increments();
    table.string("gym_location").notNullable();
  });

  await knex.schema.createTable("gym_center", (table) => {
    table.increments();
    table.string("gym_center");
  });

  await knex.schema.createTable("target_goal", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.boolean("is_completed").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable("goal", (table) => {
    table.increments();
    table.string("bmi").notNullable();
    table.string("target_weight");
    table.integer("target_id").unsigned();
    table.foreign("target_id").references("target.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable("interest", (table) => {
    table.increments();
    table.string("name").notNullable();
  });

  await knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("username").notNullable();
    table.integer("goal_id").unsigned();
    table.foreign("goal_id").references("goal.id");
    table.string("profile_pic").notNullable();
    table.date("birthday").notNullable();
    table.string("gender").notNullable();
    table.string("bio").notNullable();
    table.string("height").notNullable();
    table.string("weight").notNullable();
    table.string("gym_level").notNullable();
    table.boolean("has_membership").notNullable();
    table.integer("gym_center_id").unsigned();
    table.foreign("gym_center_id").references("gym_center.id");
    table.integer("gym_location_id").unsigned();
    table.foreign("gym_location_id").references("gym_location.id");
    table.boolean("is_pt").defaultTo("false");
    table.integer("pt_id").unsigned();
    table.foreign("pt_id").references("pt.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable("users_interest", (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("interest_id").unsigned();
    table.foreign("interest_id").references("interest.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable("users_matching", (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("matched_users_id").unsigned();
    table.foreign("matched_users_id").references("users.id");
    table.string("status").defaultTo("requested");
    table.timestamps(false, true);
  });

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
  await knex.schema.dropTable("users_matching");
  await knex.schema.dropTable("users_interest");
  await knex.schema.dropTable("users");
  await knex.schema.dropTable("interest");
  await knex.schema.dropTable("goal");
  await knex.schema.dropTable("target_goal");
  await knex.schema.dropTable("gym_center");
  await knex.schema.dropTable("gym_location");
  await knex.schema.dropTable("pt");
}
