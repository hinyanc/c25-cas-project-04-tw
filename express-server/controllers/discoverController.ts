import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { DiscoverService } from "../services/discoverService";

export class DiscoverController {
  constructor(private discoverService: DiscoverService) {}

  getUserInfo = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const userInfo = await this.discoverService.getUserInfo(userId!);
      res.status(200).json(userInfo);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getAllProfile = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const allProfile = await this.discoverService.getAllProfile(userId!);
      res.status(200).json(allProfile);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const allUserProfile = await this.discoverService.getAllUsers(userId!);
      res.status(200).json(allUserProfile);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getAllPT = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const allPTProfile = await this.discoverService.getAllPT(userId!);
      res.status(200).json(allPTProfile);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateLikeUser = async (req: Request, res: Response) => {
    try {
      // @ts-ignore
      const userId = req.user?.id;
      const targetUserId = req.params.uid;
      const result = await this.discoverService.updateLikeUser(
        userId!,
        +targetUserId
      );
      res.status(200).json(result);
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
