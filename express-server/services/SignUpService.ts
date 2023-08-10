import type { Knex } from "knex";
import { createUser } from "../utils/model";
import { hashPassword } from "../utils/hash";

export class SignUpService {
  constructor(private knex: Knex) {}

  createUser = async (input: createUser) => {
    const result = await this.knex("users")
      .select("id", "email")
      .where("email", input.email)
      .first();

    if (result) {
      throw new Error("existing users!");
    }

    const hashedPassword = await hashPassword(input.password);

    const userId = await this.knex("users")
      .insert({
        username: input.username,
        email: input.email,
        password: hashedPassword,
        gender: input.gender,
        birthday: input.birthday,
        height: parseInt(input.height),
        weight: parseInt(input.weight),
        has_membership: input.has_member,
        bio: input?.bio,
        gym_level: input.gym_level,
        profile_pic: input.profile_pic?.filename,
      })
      .returning("id");

    const interestDict = {
      Yoga: 1,
      Weightlifting: 2,
      Pilates: 3,
      "Injury recover": 4,
      Aerobic: 5,
      Cardio: 6,
      Boxing: 7,
      Stretching: 8,
    };

    let interestArr = JSON.parse(input.interestArr);

    for (let i = 0; i < interestArr.length; i++) {
      await this.knex("users_interest").insert({
        users_id: userId[0].id,
        interest_id: interestDict[interestArr[i]],
      });
    }

    if (input.has_member) {
      await this.knex("user_gym_center").insert({
        users_id: userId[0].id,
        gym_center_id: input.gym_center_id,
      });

      await this.knex("user_gym_location").insert({
        users_id: userId[0].id,
        gym_location_id: input.gym_location_id,
      });
    }

  };
}
