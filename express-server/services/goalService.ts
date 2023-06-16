import type { Knex } from "knex";
import {
  goalsTable,
  targetGoalsTable,
  userTable,
} from "../migrations/20230605101740_users";

interface SetTargetWeight {
  targetWeight: number;
}

interface AddGoals {
  goals: string;
}

export class GoalService {
  constructor(private knex: Knex) {}

  getBMI = async (userId: number) => {
    const getBMIResult = await this.knex(userTable).select('weight', 'height').where('users.id','=',userId)
    return getBMIResult;
  };

  setTargetWeight = async (input: SetTargetWeight, userId: number) => {
    const targetWeight = await this.knex(goalsTable)
      .insert({ target_weight: input.targetWeight })
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId);
    return targetWeight;
  };

  getGoals = async (userId: number) => {
    const getGoalsResult = await this.knex(goalsTable)
      .select("target.name")
      .join(targetGoalsTable, "target.goal_id", "goal.id")
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId);
    return getGoalsResult;
  };

  addGoals = async (input: AddGoals, userId: number) => {
    const addGoalsResult = await this.knex(goalsTable)
      .insert({ goals: input.goals })
      .join(targetGoalsTable, "target.goal_id", "goal.id")
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId);
    return addGoalsResult;
  };

  updateCompletedGoals = async (target_id: number, userId: number) => {
    const updateCompletedGoalsResult = await this.knex(goalsTable)
      .where("users.id", "=", userId)
      .andWhere('target.id', '=', target_id)
      .join(targetGoalsTable, "target.goal_id", "goal.id")
      .join(userTable, "goal.users_id", "users.id")
      .update('target.is_completed', true)

    return updateCompletedGoalsResult;
  };
}
