import type { Knex } from "knex";
import {
  userTable,
  usersMatchingTable,
} from "../migrations/20230605101740_users";

export class DiscoverService {
  constructor(private knex: Knex) {}

  getUserInfo = async (userId: number) => {
    const getUserInfoResult = await this.knex(userTable)
      .select("username", "profile_pic")
      .where("id", userId)
      .first();
    return getUserInfoResult;
  };

  getAllProfile = async (userId: number) => {
    const getAllProfileResult = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `users.id, is_pt, gender, username, profile_pic, (gym_center.gym_center) AS gym_center, (gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio, `
        )
      )
      .join("users_interest", "users_interest.users_id", "users.id")
      .join("interest", "users_interest.interest_id", "interest.id")
      .join("user_gym_center", "user_gym_center.users_id", "users.id")
      .join("gym_center", "user_gym_center.gym_center_id", "gym_center.id")
      .join("user_gym_location", "user_gym_location.users_id", "users.id")
      .join(
        "gym_location",
        "user_gym_location.gym_location_id",
        "gym_location.id"
      )
      .join("users_matching", function () {
        this.on("users_matching.users_id", "=", "users.id").orOn(
          "users_matching.matched_users_id",
          "=",
          "users.id"
        );
      })
      .whereNot({ "users_matching.status": "matched" })
      .andWhereNot({ "users.id": userId })
      .groupBy(
        "users.id",
        "is_pt",
        "gender",
        "username",
        "bio",
        "profile_pic",
        "gym_center.gym_center",
        "gym_location.gym_location"
        // "users_matching.status"
      );
    return getAllProfileResult;
  };

  getAllUsers = async (userId: number) => {
    const getAllUsersProfileResult = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `users.id, is_pt, gender, username, profile_pic, (gym_center.gym_center) AS gym_center, (gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio,(users_matching.status) AS match_status`
        )
      )
      .join("users_interest", "users_interest.users_id", "users.id")
      .join("interest", "users_interest.interest_id", "interest.id")
      .join("user_gym_center", "user_gym_center.users_id", "users.id")
      .join("gym_center", "user_gym_center.gym_center_id", "gym_center.id")
      .join("user_gym_location", "user_gym_location.users_id", "users.id")
      .join(
        "gym_location",
        "user_gym_location.gym_location_id",
        "gym_location.id"
      )
      .join("users_matching", function () {
        this.on("users_matching.users_id", "=", "users.id").orOn(
          "users_matching.matched_users_id",
          "=",
          "users.id"
        );
      })
      .whereNot({ "users_matching.status": "matched" })
      .andWhereNot({ "users.id": userId })
      .groupBy(
        "users.id",
        "is_pt",
        "gender",
        "username",
        "bio",
        "profile_pic",
        "gym_center.gym_center",
        "gym_location.gym_location",
        "users_matching.status"
      )
      .where("is_pt", "=", "false");
    return getAllUsersProfileResult;
  };

  getAllPT = async (userId: number) => {
    const firstStep = await this.knex(userTable)
      .select("users.id")
      .where("users.id", "!=", userId)
      .andWhere("users.is_pt", "=", true);

    console.log("step 1", firstStep);
    let NotResult: any[] = [];
    for (let item of firstStep) {
      const secondStep = await this.knex("users_matching")
        .select("matched_users_id")
        .where("users_id", "=", userId)
        .andWhere("matched_users_id", "=", item.id)
        .where("status", "=", "matched");

      if (secondStep[0] != undefined) NotResult.push(secondStep[0]);
    }

    console.log("not result ", NotResult);

    console.log("firstRound", firstStep);

    let filtered: any[] = [];

    for (let candidate of firstStep) {
      let flag = false;

      for (let target of NotResult) {
        if (candidate.id == target.matched_users_id) {
          console.log("this is not", candidate.id);
          flag = true;
        }
      }
      if (flag == true) {
      } else {
        filtered.push(candidate);
      }
    }

    console.log("filtered", filtered);
    // let filtered = firstStep.filter((item) => {
    //   return filter_func(item);
    // });

    // console.log("check filtered", filtered);

    return firstStep;
  };

  updateLikeUser = async (userId: number, targetUserId: number) => {
    // Check if a matching record already exists
    const matchExists = await this.knex.raw(
      /*sql*/ `select exists (select from users_matching where users_id = ${userId} and matched_users_id = ${targetUserId} or users_id = ${targetUserId} and matched_users_id = ${userId}) `
    );

    if (matchExists) {
      // Update the status to 'matched'
      await this.knex(usersMatchingTable)
        .where("users_id", userId)
        .andWhere("matched_users_id", targetUserId)
        .orWhere("users_id", targetUserId)
        .andWhere("matched_users_id", userId)
        .update({ status: "matched" });
      return { message: "matched" };
    } else {
      // Insert a new matching record with the status 'requested'
      await this.knex(usersMatchingTable).insert({
        users_id: userId,
        matched_users_id: targetUserId,
        status: "requested",
      });
      return { message: "requested" };
    }
  };

  updateDislikeUser = async (userId: number, targetUserId: number) => {
    // Check if a matching record already exists
    const matchExists = await this.knex.raw(
      /*sql*/ `select exists (select from users_matching where users_id = ${userId} and matched_users_id = ${targetUserId} or users_id = ${targetUserId} and matched_users_id = ${userId}) `
    );

    if (matchExists) {
      await this.knex(usersMatchingTable)
        .where("users_id", userId)
        .andWhere("matched_users_id", targetUserId)
        .orWhere("users_id", targetUserId)
        .andWhere("matched_users_id", userId)
        .update({ status: "dislike" });
    }
  };
}
