import type { Request, Response } from "express";
import { logger } from "../utils/logger";
import { SignUpService } from "../services/SignUpService";

export class SignUpController {
  constructor(private signUpService: SignUpService) {}

  createUser = async (req: Request, res: Response) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const gender = req.body.gender;
      const birthday = req.body.birthday;
      // change to number
      const height = req.body.height;
      const weight = req.body.weight;
      const has_membership = req.body.isMember;
      // use id?
      // something will be empty
      const gym_center_id = req.body.gymCenter;
      const gym_location_id = req.body.location;
      const bio = req.body.bio;
      const gym_level = req.body.gymLevel;
      // should get id and instert into user interest table
      //form state array should have active or not

      const interestArr = req.body.interest;

      await this.signUpService.createUser({
        username,
        email,
        password,
        gender,
        birthday,
        height,
        weight,
        has_membership,
        gym_center_id,
        gym_location_id,
        bio,
        gym_level,
        interestArr,
      });
      res.status(200).json({ message: "create user success" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
