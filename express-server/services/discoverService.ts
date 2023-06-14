import type { Knex } from "knex";
import { userTable, usersMatchingTable } from "../migrations/20230605101740_users";

export class DiscoverService {
  constructor(private knex: Knex) {}

  getUserInfo = async (userId: number) => {
    const getUserInfoResult = await this.knex(userTable)
      .select("username", "profile_pic")
      .where("id", userId)
      .first();
    return getUserInfoResult;
  };

  getAllProfile = async () => {
    const getAllProfileResult = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `is_pt, username, json_agg(gym_center.gym_center) AS gym_center, json_agg(gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
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
      .groupBy("is_pt", "username", "bio");
    return getAllProfileResult;
  };

  getAllUsers = async () => {
    const getAllUsersProfileResult = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `is_pt, username, json_agg(gym_center.gym_center) AS gym_center, json_agg(gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
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
      .groupBy("is_pt", "username", "bio")
      .where("is_pt", "=", "false");
    return getAllUsersProfileResult;
  };

  getAllPT = async () => {
    const getAllPTProfileResult = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `is_pt, username, json_agg(gym_center.gym_center) AS gym_center, json_agg(gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
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
      .groupBy("is_pt", "username", "bio")
      .where("is_pt", "=", "true");
    return getAllPTProfileResult;
  };

  updateLikeUser = async (userId: number, targetUserId: number) => {
    // const updateLikeUserResult = await this.knex(usersMatchingTable)
    //   .where('users_id','=')
    // return updateLikeUserResult;

    // Check if a matching record already exists
    const matchExists = await this.knex(usersMatchingTable)
    .where({ users_id: userId, matched_users_id: targetUserId })
    .orWhere({ users_id: targetUserId, matched_users_id: userId })
    .first();

    if (matchExists) {
      // Update the status to 'matched'
      await this.knex(usersMatchingTable)
        .where({ id: matchExists.id })
        .update({ status: 'matched' });
    } else {
      // Insert a new matching record with the status 'requested'
      await this.knex(usersMatchingTable).insert({
        users_id: userId,
        matched_users_id: targetUserId,
        status: 'requested',
      });
    }


  };
}
