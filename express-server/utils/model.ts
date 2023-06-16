export type User = {
  id: number;
  username: string;
  password: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type ChatroomType = {
  id: number;
  senderId: number;
  recipientId: number;
  sender_username: string;
  receiver_username: string;
  message: string;
  timestamp: Date;
};

export type Users_Type = {
  usersId: number;
  matched_usersId: number;
  status: string;
};

export interface createUser {
  username: string;
  email: string;
  password: string;
  gender: string;
  birthday: string;
  // change to number
  height: string;
  weight: string;
  // change to number
  has_membership: boolean;
  // use id?
  // something will be empty
  gym_center_id?: number|null;
  gym_location_id?: number|null;
  bio?: string;
  gym_level: string;
  // should get id and instert into user interest table
  //form state array should have active or not

  interestArr: number[];
}
