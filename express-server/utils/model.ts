export type User = {
    id: number;
    username:string
  };
  
export type LoginUserType = {
    email: string;
    password: string;
  };

export type ChatroomType = {
  senderId: number;
  receiverId: number;
  message: string;
}

export type Users_Type ={
  usersId:number;
  matched_usersId:number;
  status:string;
}
