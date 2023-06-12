import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { GoalService } from "../services/goalService";

export class GoalController {
  constructor(private goalService: GoalService) {}



  setTargetWeight = async (req: Request, res: Response) => {
    try {
        const target_weight = req.body.targetWeight;
        const userId = req.session.users_id
      await this.goalService.setTargetWeight(target_weight, userId);
      res.status(200).json({ message: "set target weight success" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}