import type { Knex } from "knex";
import { goalsTable, userTable } from "../migrations/20230605101740_users";

interface SetTargetWeight {
  targetWeight: number;
}

export class GoalService {
  constructor(private knex: Knex) {}

  getBMI = async (userId: number) => {
    const getBMIResult = await this.knex(goalsTable)
      .select("username", "profile_pic")
      .where("id", userId)
      .first();
    return getUserInfoResult;

  setTargetWeight = async (input: SetTargetWeight, userId: number) => {
    const targetWeight = await this.knex(goalsTable)
      .insert({ target_weight: input.targetWeight })
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId);
    return targetWeight;
  };
}
