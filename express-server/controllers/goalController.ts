import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { GoalService } from "../services/goalService";

export class GoalController {
  constructor(private goalService: GoalService) {}

  getBMI = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const BMI = await this.goalService.getBMI(userId!);
      res.status(200).json(BMI);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  setTargetWeight = async (req: Request, res: Response) => {
    try {
      const target_weight = req.body;
      // @ts-ignore
      const userId = req.user?.id;
      await this.goalService.setTargetWeight(target_weight, userId!);
      res.status(200).json({ message: `target weight: ${target_weight.targetWeight}` });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getGoals = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const goals = await this.goalService.getGoals(userId!);
      res.status(200).json(goals);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  addGoals = async (req: Request, res: Response) => {
    try {
      const goals = req.body;
      // @ts-ignore
      const userId = req.user?.id;
      await this.goalService.addGoals(goals, userId!);
      res.status(200).json({ message: `add goal ${goals.addGoals} success` });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateCompletedGoals = async (req: Request, res: Response) => {
    try {
      const target_id = req.params.tid;
      // @ts-ignore
      const userId = req.user?.id;
      await this.goalService.updateCompletedGoals(+target_id, userId!);
      res.status(200).json({ message: "completed goal success" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
