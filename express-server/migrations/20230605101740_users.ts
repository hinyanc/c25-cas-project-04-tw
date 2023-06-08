import { Knex } from "knex";

export const ptTable = "pt"
export const gymLocationTable = "gym_location";
export const gymCenterTable = "gym_center";
export const targetGoalsTable = "target";
export const goalsTable = "goal";
export const interestTable = "interest";
export const userTable = "users";
export const usersInterestTable = "users_interest";
export const usersMatchingTable = "users_matching";
export const chatroomTable = "chatroom";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(ptTable, (table) => {
    table.increments();
    table.string("certification");
    table.integer("hourly_rate");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(gymLocationTable, (table) => {
    table.increments();
    table.string("gym_location").notNullable();
  });

  await knex.schema.createTable(gymCenterTable, (table) => {
    table.increments();
    table.string("gym_center");
  });

  await knex.schema.createTable(targetGoalsTable, (table) => {
    table.increments();
    table.string("name").notNullable();
    table.boolean("is_completed").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(goalsTable, (table) => {
    table.increments();
    table.string("bmi").notNullable();
    table.string("target_weight");
    table.integer("target_id").unsigned();
    table.foreign("target_id").references("target.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(interestTable, (table) => {
    table.increments();
    table.string("name").notNullable();
  });

  await knex.schema.createTable(userTable, (table) => {
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

  await knex.schema.createTable(usersInterestTable, (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("interest_id").unsigned();
    table.foreign("interest_id").references("interest.id");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(usersMatchingTable, (table) => {
    table.increments();
    table.integer("users_id").unsigned();
    table.foreign("users_id").references("users.id");
    table.integer("matched_users_id").unsigned();
    table.foreign("matched_users_id").references("users.id");
    table.string("status").defaultTo("requested");
    table.timestamps(false, true);
  });

  await knex.schema.createTable(chatroomTable, (table) => {
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
  await knex.schema.dropTable(chatroomTable);
  await knex.schema.dropTable(usersMatchingTable);
  await knex.schema.dropTable(usersInterestTable);
  await knex.schema.dropTable(userTable);
  await knex.schema.dropTable(interestTable);
  await knex.schema.dropTable(goalsTable);
  await knex.schema.dropTable(targetGoalsTable);
  await knex.schema.dropTable(gymCenterTable);
  await knex.schema.dropTable(gymLocationTable);
  await knex.schema.dropTable(ptTable);
}
