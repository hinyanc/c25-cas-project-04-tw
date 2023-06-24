import type { Knex } from "knex";
import {
  userTable,
  usersMatchingTable,
} from "../migrations/20230605101740_users";

// interface UsersMatching {
//   users_id: number;
//   matched_users_id: number;
//   status: string;
// }
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
    const allProfiles = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `users.id, is_pt, gender, username, profile_pic, (gym_center.gym_center) AS gym_center, (gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
        )
      )
      .whereNot("users.id", userId)
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
      .groupBy(
        "users.id",
        "is_pt",
        "gender",
        "username",
        "bio",
        "profile_pic",
        "gym_center.gym_center",
        "gym_location.gym_location"
      );

      console.log(allProfiles)

    let filterMatchedAll: any[] = [];
    const matchedAll = await this.knex.raw(
      /*sql*/ `SELECT DISTINCT matched_users_id AS matched_user
      FROM users_matching
      WHERE users_id = ? AND status = 'matched'
      UNION
      SELECT DISTINCT users_id AS matched_user
      FROM users_matching
      WHERE matched_users_id = ? AND status = 'matched';`,
      [userId, userId]
    );

    filterMatchedAll = matchedAll.rows;

    console.log("not result ", filterMatchedAll);

    let allResult: any[] = [];

    for (let candidate of allProfiles) {
      let flag = false;

      for (let target of filterMatchedAll) {
        if (candidate.id == target.matched_user) {
          flag = true;
        }
      }
      if (flag == true) {
      } else {
        allResult.push(candidate);
      }
    }

    console.log("filtered", allResult);

    return allResult;
  };

  getAllUsers = async (userId: number) => {
    const allUsers = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `users.id, is_pt, gender, username, profile_pic, (gym_center.gym_center) AS gym_center, (gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
        )
      )
      .where("users.id", "!=", userId)
      .andWhere("users.is_pt", "=", false)
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
      .groupBy(
        "users.id",
        "is_pt",
        "gender",
        "username",
        "bio",
        "profile_pic",
        "gym_center.gym_center",
        "gym_location.gym_location"
      );

    let filterMatchedUsers: any[] = [];
    const matchedAll = await this.knex.raw(
      /*sql*/ `SELECT DISTINCT matched_users_id AS matched_user
    FROM users_matching
    WHERE users_id = ? AND status = 'matched'
    UNION
    SELECT DISTINCT users_id AS matched_user
    FROM users_matching
    WHERE matched_users_id = ? AND status = 'matched';`,
      [userId, userId]
    );

    filterMatchedUsers = matchedAll.rows;

    console.log("not result ", filterMatchedUsers);

    let usersResult: any[] = [];

    for (let candidate of allUsers) {
      let flag = false;

      for (let target of filterMatchedUsers) {
        if (candidate.id == target.matched_user) {
          flag = true;
        }
      }
      if (flag == true) {
      } else {
        usersResult.push(candidate);
      }
    }

    console.log("filtered", usersResult);

    return usersResult;
  };

  getAllPT = async (userId: number) => {
    const allPT = await this.knex(userTable)
      .select(
        this.knex.raw(
          /*sql*/ `users.id, is_pt, gender, username, profile_pic, (gym_center.gym_center) AS gym_center, (gym_location.gym_location) AS gym_location, json_agg(interest.name) AS interest_name, bio`
        )
      )
      .where("users.id", "!=", userId)
      .andWhere("users.is_pt", "=", true)
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
      .groupBy(
        "users.id",
        "is_pt",
        "gender",
        "username",
        "bio",
        "profile_pic",
        "gym_center.gym_center",
        "gym_location.gym_location"
      );

    let filterMatchedPT: any[] = [];

    const matchedAll = await this.knex.raw(
      /*sql*/ `SELECT DISTINCT matched_users_id AS matched_user
      FROM users_matching
      WHERE users_id = ? AND status = 'matched'
      UNION
      SELECT DISTINCT users_id AS matched_user
      FROM users_matching
      WHERE matched_users_id = ? AND status = 'matched';`,
      [userId, userId]
    );

    filterMatchedPT = matchedAll.rows;

    console.log("not result ", filterMatchedPT);

    let ptResult: any[] = [];

    for (let candidate of allPT) {
      let flag = false;

      for (let target of filterMatchedPT) {
        if (candidate.id == target.matched_user) {
          flag = true;
        }
      }
      if (flag == true) {
      } else {
        ptResult.push(candidate);
      }
    }

    console.log("filtered", ptResult);

    return ptResult;
  };

  // updateLikeUser = async (userId: number, targetUserId: number) => {
  //   // Check if a matching record already exists
  //   const matchExists = await this.knex.raw(
  //     /*sql*/ `select exists (select from users_matching where users_id = ? and matched_users_id = ? or users_id = ? and matched_users_id = ?) `,
  //     [userId, targetUserId, targetUserId, userId]
  //   );

  //   if (!matchExists.rows[0].exists) {
  //     // Insert a new matching record with the status 'requested'
  //     await this.knex(usersMatchingTable).insert({
  //       users_id: userId,
  //       matched_users_id: targetUserId,
  //       status: "requested",
  //     });
  //     return { message: "requested" };
  //   } else if (matchExists.rows[0].matched_users_id === userId) {
  //     // Update the status to 'matched'
  //     await this.knex(usersMatchingTable)
  //       .where(function () {
  //         this.where("users_id", targetUserId).andWhere(
  //           "matched_users_id",
  //           userId
  //         );
  //       })
  //       .update({ status: "matched" });
  //     return { message: "matched" };
  //   } else if (matchExists.rows[0].users_id === userId) {
  //     return { message: "no action taken" };
  //   }
  // };
  updateLikeUser = async (userId: number, targetUserId: number) => {
    // Check if a matching record already exists
    const matchExists = await this.knex.raw(
      /*sql*/ `select exists (select from users_matching where users_id = ? and matched_users_id = ? or users_id = ? and matched_users_id = ?) `,
      [userId, targetUserId, targetUserId, userId]
    );

    const ids = await this.knex.raw(`select users_matching.users_id, users_matching.matched_users_id from users_matching where users_id = ? and matched_users_id = ? or users_id = ? and matched_users_id = ?`, [userId, targetUserId, targetUserId, userId])

    if (!matchExists.rows[0].exists) {
      // Insert a new matching record with the status 'requested'
      await this.knex(usersMatchingTable).insert({
        users_id: userId,
        matched_users_id: targetUserId,
        status: "requested",
      });
      return { message: "insert requested" };
    } else if (ids.rows[0].matched_users_id === userId) {
      // Update the status to 'matched' if matched_users_id = userId
      await this.knex(usersMatchingTable)
        .where("users_id", targetUserId)
        .andWhere("matched_users_id", userId)
        .update({ status: "matched" });
      return { message: "matched" };
    } else {
      // Do nothing if users_id = userId
      return { message: "no action taken" };
    }
  };
}