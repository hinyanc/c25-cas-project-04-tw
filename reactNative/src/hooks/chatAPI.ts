import {useQuery} from '@tanstack/react-query';

interface ChatList {
  target_user_id: number;
  user_username: string;
  profile_pic: string;
  message: string;
  updated_at: Date;
}

export function useChatList() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['chatList'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/chatlist');
      const result = await response.json();
      return result.data as ChatList[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}
