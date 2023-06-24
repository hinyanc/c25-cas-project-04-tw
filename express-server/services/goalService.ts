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
  addGoals: string;
}

export class GoalService {
  constructor(private knex: Knex) {}

  getBMI = async (userId: number) => {
    const getBMIResult = await this.knex(userTable)
      .select("weight", "height")
      .where("id", userId)
      .first();
    return getBMIResult;
  };

  setTargetWeight = async (input: SetTargetWeight, userId: number) => {
    const targetWeight = await this.knex(goalsTable).insert({
      users_id: userId,
      target_weight: input.targetWeight,
    });
    return targetWeight;
  };

  getGoals = async (userId: number) => {
    const getGoalsResult = await this.knex(goalsTable)
      .select("target.id", "target.name", "is_completed")
      .join(targetGoalsTable, "target.goal_id", "goal.id")
      .join(userTable, "goal.users_id", "users.id")
      .where("users.id", "=", userId)
      .orderBy("is_completed", "asc")
      .orderBy('id', 'desc');
    return getGoalsResult;
  };

  addGoals = async (input: AddGoals, userId: number) => {
    const addGoalsResult = await this.knex.raw(
      /*sql*/ `
      INSERT INTO target (name, is_completed, goal_id)
      VALUES (?, false,
      (SELECT id
      FROM goal
      WHERE users_id = ?
      LIMIT 1))`,
      [input.addGoals, userId]
    );
    return addGoalsResult.rows;
  };

  updateCompletedGoals = async (target_id: number, userId: number) => {
    const resultId = await this.knex.raw(
      /*sql*/ `
      UPDATE target t
      SET is_completed = NOT is_completed
      FROM goal g
      WHERE t.goal_id = g.id
      AND users_id = ?
      AND t.id = ?
      RETURNING t.id as id
    `,
      [userId, target_id]
    );
    return resultId.rows;
  };
}
