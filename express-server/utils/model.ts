export type User = {
  id: number;
  username: string;
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
