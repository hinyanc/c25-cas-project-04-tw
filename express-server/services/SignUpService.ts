import type { Knex } from "knex";
// import {
//   gymLocationTable,
//   gymCenterTable,
//   interestTable,
//   userTable,
//   usersInterestTable,
//   userGymCenterTable,
//   userGymLocationTable,
// } from "../migrations/20230605101740_users";
import { createUser } from "../utils/model";
import { hashPassword } from "../utils/hash";

export class SignUpService {
  constructor(private knex: Knex) {}

  createUser = async (input: createUser) => {
    const result = await this.knex("users")
      .select("id", "email")
      .where("email", input.email)
      .first();

      console.log("createUser service",input.gym_level)
    if (result) {
      throw new Error("existing users!");
    }

    const hashedPassword = await hashPassword(input.password);

    const userId = await this.knex("users").insert({
        username:input.username,
        email:input.email,
        password:hashedPassword,
        gender:input.gender,
        birthday:input.birthday,
        height:parseInt(input.height),
        weight:parseInt(input.weight),
        has_membership:input.has_member,
        bio:input?.bio,
        gym_level:input.gym_level,
        profile_pic:input.profile_pic?.filename
    }).returning("id");
    console.log("userId",userId)
  };
}
