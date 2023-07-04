import { Knex } from "knex";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../utils/hash";
const moment = require("moment-timezone");

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
  ptCertificateTable,
  chatroomTable,
  userGymCenterTable,
  userGymLocationTable,
} from "../migrations/20230605101740_users";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userGymLocationTable).del();
  await knex(userGymCenterTable).del();
  await knex(chatroomTable).del();
  await knex(ptCertificateTable).del();
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
    "LCSD",
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
      name: interests[i],
    });
  }

  //////insert data for user table/////

  //default email
  const emails: string[] = [
    "beyourdetective@gmail.com",
    "learning20150133@gmail.com",
    "yannes.0828@gmail.com",
    "johndoe1234@example.com",
    "emily.smith85@gmail.com",
    "michaelbrown2022@hotmail.com",
    "sarahjackson23@yahoo.com",
    "david.wilson456@gmail.com",
    "lisa.carter87@example.com",
    "chris.thompson99@hotmail.com",
    "jennifer.harris55@yahoo.com",
    "matthewgreen234@gmail.com",
    "laura.miller76@example.com",
    "kevin.wright82@yahoo.com",
    "melissa.jones1234@gmail.com",
    "roberto.sanchez68@example.com",
  ];
  const image: string[] = [
    "alex.jpeg",
    "sohee.jpeg",
    "masami.jpeg",
    "jeffery.jpeg",
    "coffee.jpeg",
    "edison.jpeg",
    "kasumi.jpeg",
    "jason.jpeg",
    "yui.jpeg",
    "yipman.jpeg",
    "elva.jpeg",
    "eddie.jpeg",
    "jennie.jpeg",
    "bruce.jpeg",
    "jisoo.jpeg",
    "adams.jpeg",
    "lisa.jpeg",
    "edgar.jpeg",
    "rose.jpeg",
    "angelababy.jpeg",
  ];
  const usernames: string[] = [
    "Alex",
    "So hee",
    "Masami",
    "Jeffery",
    "Coffee",
    "Edison",
    "Kasumi",
    "Jason",
    "Yui",
    "Yip Man",
    "Elva",
    "Eddie",
    "Jennie",
    "Bruce",
    "Jisoo",
    "Adams",
    "Lisa",
    "Edgar",
    "Rose",
    "Angelababy",
  ];
  const gender: string[] = [
    "Male",
    "Female",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Male",
    "Female",
    "Female",
  ];
  const bio: string[] = [
    "Passionate about fitness and pushing my limits. Gym is my second home. Always striving for progress, not perfection. Let's sweat it out together! 💪🏋️‍♂️",
    "Endurance athlete sharing training methods and race experiences for runners. 🏃‍♂️",
    "Chasing endorphins and setting new fitness goals every day. Gym addict on a mission to become the best version of myself. Join me on this sweaty journey! 🏋️‍♀️💦",
    "Physical therapist advocating for functional fitness and injury prevention. 🩺",
    "Dedication and determination are my workout mantras. I believe in the power of fitness to transform lives. Let's crush our goals and inspire others along the way! 💥💪",
    "Sweating it out, one rep at a time. Fitness is not just a hobby; it's a lifestyle. Join me in my fitness journey as we strive for strength, both physically and mentally! 🏋️‍♀️💫",
    "Calisthenics expert showcasing awe-inspiring bodyweight moves and tutorials. 🤸‍♂️",
    "Embracing the grind and pushing beyond my limits. The gym is where I find solace and unleash my inner strength. Fitness is my passion, and I'm here to inspire you to find yours! 💪🔥",
    "Dancing through life with a fitness mindset. Gym sessions are my therapy, and breaking a sweat is my way of expressing myself. Let's groove and stay fit together! 💃💪",
    "No-nonsense fitness coach motivating followers to embrace discipline and consistency. 🔥",
    "Balancing my love for food with intense workouts. Cooking healthy meals and hitting the gym keeps me in harmony. Join me in the pursuit of a fit and flavorful lifestyle! 🍳🥗💪",
    "Dance is my cardio, and the gym is my playground. I'm all about embracing the joy of movement and sculpting a strong, confident body. Let's groove and grow together! 💃💪",
    "Motivational speaker promoting self-love and body positivity through fitness. 💖",
    "Capturing fitness moments one snapshot at a time. Combining my passion for photography with a dedication to fitness. Join me on this visual journey of strength and perseverance! 📸💪",
    "Exploring the beauty of fitness and the outdoors. From hiking trails to yoga mats, I believe in finding harmony between nature and the gym. Let's find our balance together! 🌿🏋️‍♀️",
    "Certified personal trainer inspiring others to embrace a fit lifestyle. 💪",
    "Competitive bodybuilder and fitness model pushing limits and empowering others. 🏋️‍♂️",
    "Yoga instructor promoting balance and mindfulness through poses and meditation. 🧘‍♀️",
    "Former athlete turned fitness coach, designing challenging workouts for all levels. 🏅",
    "Nutritionist sharing delicious recipes and evidence-based advice for healthy eating. 🥗",
  ];
  //dummy email
  for (let randomEmail = 0; randomEmail < 17; randomEmail++) {
    const email = faker.internet.email();
    emails.push(email);
  }

  for (let i = 0; i < 20; i++) {
    const isPt = faker.datatype.boolean();
    const hasMembership = faker.datatype.boolean();

    await knex(userTable).insert({
      email: emails[i],
      //hash password
      password: await hashPassword("123abc"),
      username: usernames[i],
      //can't generate useful picture
      profile_pic: image[i],
      birthday: faker.date.birthdate({ min: 18, max: 50, mode: "age" }),
      gender: gender[i],
      bio: bio[i],
      height: faker.number.int({ min: 155, max: 200 }),
      weight: faker.number.int({ min: 45, max: 80 }),
      gym_level: faker.helpers.arrayElement(["Newbie", "Moderate", "Vigorous"]),
      has_membership: hasMembership,
      is_pt: isPt,
      created_at: moment(faker.date.past())
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss"),
      updated_at: moment(faker.date.recent())
        .utcOffset(8)
        .format("YYYY-MM-DD HH:mm:ss"),
    });
  }

  /////////////insert data for goals table///////

  for (let i = 1; i < 21; i++) {
    // const height = await knex("users")
    //   .select("height")
    //   .where("id", "=", `${i}`)
    //   .first();
    // const weight = await knex("users")
    //   .select("weight")
    //   .where("id", "=", `${i}`)
    //   .first();
    // const bmi = weight / (height * height);

    await knex(goalsTable).insert({
      users_id: i,
      target_weight: faker.number.int({ min: 45, max: 75 }),
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
    "Lose body fat %",
    "Increase Strength: Lift heavier weights to build overall muscle strength.",
    "Build Muscle Mass: Combine resistance training and proper nutrition for muscle growth.",
    "Improve Cardiovascular Endurance: Engage in aerobic exercises to boost stamina and heart health.",
    "Enhance Flexibility: Stretch regularly to improve range of motion.",
    "Lose Weight: Focus on a calorie-controlled diet and a mix of cardio and strength training.",
    "Increase Power: Incorporate explosive exercises for enhanced power output.",
    "Boost Core Strength: Work on core exercises for stability and a strong midsection.",
    "Improve Balance: Practice balance-focused exercises for coordination improvement.",
    "Enhance Functional Fitness: Perform functional movements to improve everyday activities.",
    "Reduce Stress: Engage in mind-body activities for stress reduction and mental well-being.",
  ];

  for (let i = 0; i < targetGoals.length; i++) {
    await knex(targetGoalsTable).insert({
      goal_id: faker.number.int({ min: 1, max: 10 }),
      name: targetGoals[i],
      is_completed: faker.datatype.boolean(),
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
    [3, 5, 2],
    [8, 1, 7],
    [6, 4, 3],
    [2, 5, 1],
    [4, 8, 7],
    [6, 1, 2],
    [7, 3, 6],
    [4, 1, 5],
    [3, 8, 7],
    [6, 2, 4],
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
  let matched = [
    [
      [2, 5],
      [2, 6],
      [2, 3],
    ],
    [
      [1, 7],
      [1, 4],
      [1, 2],
    ],
    [
      [3, 8],
      [3, 9],
      [3, 1],
    ],
  ];

  for (let i = 0; i < matched.length; i++) {
    for (let j = 0; j < matched[i].length; j++) {
      await knex(usersMatchingTable).insert({
        users_id: matched[i][j][0],
        matched_users_id: matched[i][j][1],
        status: "matched",
      });
    }
  }

  //////insert into user matching table////
  let requested = [
    [
      [4, 2],
      [4, 3],
    ],
    [
      [5, 1],
      [5, 3],
    ],
    [
      [6, 1],
      [6, 3],
    ],
    [
      [7, 2],
      [7, 3],
    ],
    [
      [8, 2],
      [8, 1],
    ],
    [
      [9, 2],
      [9, 1],
    ],
    [
      [10, 2],
      [10, 1],
      [10, 3],
    ],
    [
      [11, 2],
      [11, 1],
      [11, 3],
    ],
    [
      [12, 2],
      [12, 1],
      [12, 3],
    ],
    [
      [13, 2],
      [13, 1],
      [13, 3],
    ],
    [
      [14, 2],
      [14, 1],
      [14, 3],
    ],
    [
      [15, 2],
      [15, 1],
      [15, 3],
    ],
    [
      [16, 2],
      [16, 1],
      [16, 3],
    ],
    [
      [17, 2],
      [17, 1],
      [17, 3],
    ],
    [
      [18, 2],
      [18, 1],
      [18, 3],
    ],
    [
      [19, 2],
      [19, 1],
      [19, 3],
    ],
    [
      [20, 2],
      [20, 1],
      [20, 3],
    ],
  ];
  // let matchingStatus = ["requested", "matched"];

  for (let i = 0; i < requested.length; i++) {
    for (let j = 0; j < requested[i].length; j++) {
      await knex(usersMatchingTable).insert({
        users_id: requested[i][j][0],
        matched_users_id: requested[i][j][1],
        status: "requested",
      });
    }
  }

  /////insert  into pt profile Table////
  for (let i = 1; i < 21; i++) {
    let ispt = faker.datatype.boolean();
    if (ispt) {
      await knex(ptTable).insert({
        users_id: i,
        hourly_rate: faker.number.int({ min: 500, max: 1000 }),
      });
    }
  }
  /////insert  into pt certificate Table////
  for (let i = 1; i < 21; i++) {
    const isPt = await knex(ptTable)
      .select("id")
      .where("id", "=", `${i}`)
      .first();

    if (isPt) {
      await knex(ptCertificateTable).insert({
        pt_profile_id: i,
        certification: faker.image.avatar(),
      });
    }
  }

  ///////////insert data into chatroomTable////////
  for (let i = 0; i < 20; i++) {
    let sender_id = faker.datatype.boolean() ? 2 : 1;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 2 : 1;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = moment(faker.date.past())
      .utcOffset(8)
      .format("YYYY-MM-DD HH:mm:ss");

    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
  for (let i = 0; i < 20; i++) {
    let sender_id = faker.datatype.boolean() ? 3 : 1;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 3 : 1;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = moment(faker.date.past())
      .utcOffset(8)
      .format("YYYY-MM-DD HH:mm:ss");
    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
  for (let i = 0; i < 20; i++) {
    let sender_id = faker.datatype.boolean() ? 2 : 3;
    let receiver_id;
    do {
      receiver_id = faker.datatype.boolean() ? 2 : 3;
    } while (receiver_id === sender_id);
    let message = faker.lorem.sentence();
    let created_at = moment(faker.date.past())
      .utcOffset(8)
      .format("YYYY-MM-DD HH:mm:ss");
    await knex(chatroomTable).insert({
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      created_at: created_at,
    });
  }
  //////////insert into userGymCenterTable/////
  for (let i = 1; i < 21; i++) {
    const isMember = await knex("users")
      .select("has_membership")
      .where("id", "=", `${i}`)
      .first();

    if (isMember) {
      await knex(userGymCenterTable).insert({
        users_id: i,
        gym_center_id: faker.number.int({ min: 1, max: 8 }),
      });
    }
  }
  //////////insert into userGymLocationTable/////
  for (let i = 1; i < 21; i++) {
    await knex(userGymLocationTable).insert({
      users_id: i,
      gym_location_id: faker.number.int({ min: 1, max: 18 }),
    });
  }
}
