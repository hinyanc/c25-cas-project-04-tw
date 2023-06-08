import { Knex } from "knex";
import { faker } from "@faker-js/faker";

import {
  ptTable,
  gymLocationTable,
  gymCenterTable,
  targetGoalsTable,
  goalsTable,
  interestTable,
  userTable,
  usersInterestTable,
  usersmatchingTable,
  chatroomTable,
} from "../migrations/20230605101740_users";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userTable).del();

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
      password: faker.internet.password(),
      username: faker.internet.userName(),
      //not sure
      goal_id: goalId,
      //can't generate picture
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
}
