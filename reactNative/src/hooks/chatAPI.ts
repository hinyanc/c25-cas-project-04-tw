import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
interface ChatList {
  target_user_id: number;
  target_username: string;
  profile_pic: string;
  last_message: string;
  created_at: Date;
}

export function useChatList(token: string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['chatList', token],
    queryFn: async () => {
      const response = await fetch(`${REACT_APP_API_SERVER}/chatlist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      return result as ChatList[];
    },
    retry: true,
  });

  if (isLoading || isFetching || error || !data) {
    if (error) console.log(error);
    return [];
  }
  return data;
}

export async function deleteChat(chatId: number, token: string) {
  const response = await fetch(`${REACT_APP_API_SERVER}/chatlist/${chatId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result.data;
}
