import type { Knex } from "knex";
import { goalsTable, userTable } from "../migrations/20230605101740_users";

interface SetTargetWeight {
  targetWeight: number;
}

export class GoalService {
  constructor(private knex: Knex) {}

  getBMI = async (userId: number) => {
    const getBMIResult = await this.knex.raw(
      /*sql*/ `SELECT SUM(weight / (height * height)) FROM users WHERE id = ${userId}`
    );
    return getBMIResult;
  };

  setTargetWeight = async (input: SetTargetWeight, userId: number) => {
    const targetWeight = await this.knex(goalsTable)
      .insert({ target_weight: input.targetWeight })
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId);
    return targetWeight;
  };
}
