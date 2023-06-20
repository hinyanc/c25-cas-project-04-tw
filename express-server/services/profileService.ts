import type { Knex } from "knex";
import { userTable } from "../migrations/20230605101740_users";

interface Info {
  profile_pic: string;
  username: string;
  email: string;
  gender: string;
  birthday: Date;
  height: number;
  weight: number;
  bio: string;
  gymLevel: string;
  interest: string;
  gymCenter: string;
  gymLocation: string;
}

export class ProfileService {
  constructor(private knex: Knex) {}

  getInfo = async (userId: number) => {
    const infoResult = await this.knex(userTable)
      .select(
        "users.profile_pic",
        "users.username",
        "users.email",
        "users.gender",
        "users.birthday",
        "users.height",
        "users.weight",
        "users.bio",
        "users.gym_level",
        this.knex.raw("json_agg(interest.name) as interest_names"),
        "gym_center.gym_center",
        "gym_location.gym_location"
      )
      .leftJoin("users_interest", "users.id", "users_interest.users_id")
      .leftJoin("interest", "users_interest.interest_id", "interest.id")
      .leftJoin("user_gym_center", "users.id", "user_gym_center.users_id")
      .leftJoin("gym_center", "user_gym_center.gym_center_id", "gym_center.id")
      .leftJoin("user_gym_location", "users.id", "user_gym_location.users_id")
      .leftJoin(
        "gym_location",
        "user_gym_location.gym_location_id",
        "gym_location.id"
      )
      .where("users.id", userId)
      .groupBy(
        "users.id",
        "users.profile_pic",
        "users.username",
        "users.email",
        "users.gender",
        "users.birthday",
        "users.height",
        "users.weight",
        "users.bio",
        "users.gym_level",
        "gym_center.gym_center",
        "gym_location.gym_location"
      );

    return infoResult;
  };

  updateInfo = async (userId: number, input: Info) => {
    const result = await this.knex.transaction(async (trx) => {
      await trx(userTable).where("id", userId).update({
        username: input.username,
        email: input.email,
        gender: input.gender,
        birthday: input.birthday,
        height: input.height,
        weight: input.weight,
        bio: input.bio,
        gym_level: input.gymLevel,
      });

      const id = await trx("users").select("id").where("id", userId).first();

      // Update interest table
      await trx("interest")
        .whereIn("id", function () {
          this.select("interest_id")
            .from("users_interest")
            .where("users_id", userId);
        })
        .update({
          name: input.interest,
        });

      // Update gym_center table
      await trx("gym_center")
        .whereIn("id", function () {
          this.select("gym_center_id")
            .from("user_gym_center")
            .where("users_id", userId);
        })
        .update({
          gym_center: input.gymCenter,
        });

      // Update gym_location table
      await trx("gym_location")
        .whereIn("id", function () {
          this.select("gym_location_id")
            .from("user_gym_location")
            .where("users_id", userId);
        })
        .update({
          gym_location: input.gymLocation,
        });

      return id.id;
    });
    return result;
  };
}
