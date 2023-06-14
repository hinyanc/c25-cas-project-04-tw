import {useQuery} from '@tanstack/react-query';

interface ChatList {
  target_user_id: number;
  user_username: string;
  profile_pic: string;
  message: string;
  updated_at: Date;
}
