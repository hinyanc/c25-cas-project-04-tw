import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { ProfileService } from "../services/profileService";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  getInfo =async (req: Request, res: Response) => {
    try {
        // @ts-ignore
      const userId = req.user?.id;
      const info = await this.profileService.getInfo(userId!);
      res.status(200).json(info);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  updateInfo = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
      const userId = req.user?.id;
      const updates = req.body;
      const result = await this.profileService.updateInfo(userId!, updates);
      res.status(200).json(result);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
