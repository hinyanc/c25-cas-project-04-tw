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
      const has_member = req.body.has_member;
      // use id?
      // something will be empty
      const gym_center_id = req.body?.gym_center_id;
      const gym_location_id = req.body?.gym_location_id;
      const bio = req.body?.bio;
      const gym_level = req.body.gym_level;
      // should get id and instert into user interest table
      //form state array should have active or not

      const interestArr = req.body.interestArr;

      const profile_pic = req.file;

      await this.signUpService.createUser({
        username,
        email,
        password,
        gender,
        birthday,
        height,
        weight,
        has_member,
        gym_center_id,
        gym_location_id,
        bio,
        gym_level,
        interestArr,
        profile_pic,
      });

      res.status(200).json({ message: "create user success" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
