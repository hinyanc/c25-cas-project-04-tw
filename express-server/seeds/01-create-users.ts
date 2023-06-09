import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../utils/hash";

import {
  gymLocationTable,
  gymCenterTable,
  interestTable,
  userTable,
  goalsTable,
  targetGoalsTable,
  usersInterestTable,
  usersMatchingTable,
  ptTable,
  chatroomTable,
  userGymCenterTable,
  userGymLocationTable
} from "../migrations/20230605101740_users";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userGymLocationTable).del();
  await knex(userGymCenterTable).del();
  await knex(chatroomTable).del();
  await knex(ptTable).del();
  await knex(usersMatchingTable).del();
  await knex(usersInterestTable).del();
  await knex(targetGoalsTable).del();
  await knex(goalsTable).del();
  await knex(userTable).del();
  await knex(interestTable).del();
  await knex(gymCenterTable).del();
  await knex(gymLocationTable).del();
///////insert data for pt table//////


  //////insert data for gym location/////
  const gymLocations: string[] = [
    "Central and Western",
    "Eastern",
    "Southern",
    "Wan Chai",
    "Kowloon City",
    "Kwun Tong",
    "Sham Shui Po",
    "Wong Tai Sin",
    "Yau Tsim Mong",
    "Islands",
    "Kwai Tsing",
    "North",
    "Sai Kung",
    "Sha Tin",
    "Tai Po",
    "Tsuen Wan",
    "Tuen Mun",
    "Yuen Long",
  ];

  for (let i = 0; i < gymLocations.length; i++) {
    await knex(gymLocationTable).insert({
      gym_location: gymLocations[i],
    });
  }
  //////insert data for  gym center/////
  const gymCenter = [
    "24/7 Fitness",
    "Pure Fitness",
    "Go24",
    "Physical",
    "Fitness First",
    "Anytime Fitness",
    "Snap Fitness",
    "Leisure and Cultural Services Department (LCSD)",
  ];

  for (let i = 0; i < gymCenter.length; i++) {
    await knex(gymCenterTable).insert({
      gym_center: gymCenter[i],
    });
  }
  
  ////// insert data for interest table/////
  const interests: string[] = [
    "Yoga",
    "Weightlifting",
    "Pilates",
    "Injury recover",
    "Aerobic",
    "Cardio",
    "Boxing",
    "Stretching",
  ];

  for (let i = 0; i < interests.length; i++) {
    await knex(interestTable).insert({
      name: interests[0],
    });
  }
  ///////insert data for target goals///////
  const targetGoals = [
    "Increase muscle mass and strength",
    "Improve cardiovascular health and endurance",
    "Burn fat and lose weight",
    "Increase flexibility and range of motion",
    "Build core stability and balance",
    "Enhance athletic performance in a specific sport or activity",
    "Improve posture and reduce back pain",
    "Boost energy levels and reduce fatigue",
    "Increase bone density and prevent osteoporosis",
    "Improve mental health and reduce stress and anxiety",
    "Strengthen immune system and reduce risk of illness",
    "Increase metabolism and improve digestion",
    "Improve sleep quality and duration",
    "Increase self-confidence and self-esteem",
    "Improve overall body composition and appearance",
    "Work on specific muscle groups or body parts",
    "Improve coordination and agility",
    "Reduce risk of chronic diseases such as diabetes and heart disease",
    "Increase overall fitness and well-being",
    "running a marathon",
    "completing a triathlon",
  ];

  for (let i = 0; i < targetGoals.length; i++) {
    await knex(targetGoalsTable).insert({
      name: targetGoals[0],
      is_completed: faker.datatype.boolean(),
    });
  }

  /////////////insert data for goals table///////

  for (let i = 1; i < 11; i++) {
    const height = await knex("users")
      .select("height")
      .where("id", "=", `${i}`)
      .first();
    const weight = await knex("users")
      .select("weight")
      .where("id", "=", `${i}`)
      .first();
    const bmi = weight / (height * height);

    await knex(goalsTable).insert({
      bmi: bmi,
      target_weight: faker.number.int({ min: 50, max: weight - 5 }) + "kg",
      target_id: faker.number.int({ min: 1, max: 20 }),
    });
  }

  //////insert data for user table/////

  // Inserts seed entries
  const usedGoalIds = new Set();
  //default email
  const emails: string[] = [
    "beyourdetective@gmail.com",
    "learning20150133@gmail.com",
    "yannes.0828@gmail.com",
  ];
  //dummy email
  for (let randomEmail = 0; randomEmail < 7; randomEmail++) {
    const email = faker.internet.email();
    emails.push(email);
  }

  for (let i = 0; i < 10; i++) {
    const isPt = faker.datatype.boolean();
    const hasMembership = faker.datatype.boolean();
    let goalId = faker.number.int({ min: 1, max: 10 });
    while (usedGoalIds.has(goalId)) {
      // generate a new goal ID if already used
      goalId = faker.number.int({ min: 1, max: 10 });
    }
    usedGoalIds.add(goalId); // add the new goal ID to the set of used IDs
    await knex(userTable).insert({
      email: emails[0],
      //hash password
      password: await hashPassword("123abc"),
      username: faker.internet.userName(),
      //not sure
      goal_id: goalId,
      //can't generate useful picture
      profile_pic: faker.image.avatar(),
      birthday: faker.date.birthdate({ min: 18, max: 65, mode: "age" }),
      gender: faker.helpers.arrayElement(["Male", "Female"]),
      bio: faker.lorem.sentence(),
      height: faker.number.int({ min: 150, max: 200 }) + "cm",
      weight: faker.number.int({ min: 50, max: 100 }) + "kg",
      gym_level: faker.helpers.arrayElement(["Newbie", "Moderate", "Vigorous"]),
      has_membership: hasMembership,
      gym_center_id: hasMembership
        ? faker.number.int({ min: 1, max: 8 })
        : null,
      gym_location_id: faker.number.int({ min: 1, max: 18 }),
      is_pt: isPt,
      pt_id: isPt ? faker.number.int({ min: 1, max: 5 }) : null,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  /////insert data for user interest table///////
  const interest = [
    [1, 2, 4],
    [3, 5, 7],
    [8, 4, 3],
    [1, 6, 3],
    [8, 5, 7],
    [2, 6, 4],
    [1, 5, 2],
    [4, 7, 3],
    [1, 7, 3],
    [7, 6, 5],
  ];

  for (let i = 0; i < interest.length; i++) {
    for (let j = 0; j < interest[i].length; j++) {
      await knex(usersInterestTable).insert({
        users_id: i + 1,
        interest_id: interest[i][j],
      });
    }
  }

  //////insert into user matching table////
  let matching = [
    [
      [1, 4],
      [1, 5],
      [1, 2],
    ],
    [
      [0, 6],
      [0, 3],
      [0, 1],
    ],
    [
      [2, 7],
      [2, 8],
      [2, 0],
    ],
  ];
  let matchingStatus = ["request", "dislike", "matched"];

  for (let i = 0; i < matching.length; i++) {
    for (let j = 0; j < matching[i].length; j++) {
      await knex(usersMatchingTable).insert({
        users_id: matching[i][j][0],
        matched_users_id: matching[i][j][1],
        status: matchingStatus[j],
      });
    }
  }

  ///////////insert data into chatroomTable////////
  for (let i = 0; i < 10; i++) {
    let sender_id = faker.datatype.boolean() ? 1 : 0;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 1 : 0;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = faker.date.past();

    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
  for (let i = 0; i < 10; i++) {
    let sender_id = faker.datatype.boolean() ? 2 : 0;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 2 : 0;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = faker.date.past();
    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
  for (let i = 0; i < 10; i++) {
    let sender_id = faker.datatype.boolean() ? 1 : 2;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 1 : 2;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = faker.date.past();
    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
}
