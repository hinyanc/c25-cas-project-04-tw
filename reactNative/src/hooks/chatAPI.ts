import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
interface ChatList {
  target_user_id: number;
  target_username: string;
  profile_pic: string;
  last_message: string;
  updated_at: Date;
}

export function useChatList(mainUserId: string) {
  console.log('check hook', mainUserId);
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['chatList', mainUserId],
    queryFn: async () => {
      const response = await fetch(
        `${REACT_APP_API_SERVER}/chatlist/mainUserId/${mainUserId}`,
      );
      const result = await response.json();
      console.log('check check', result);
      return result as ChatList[];
    },
    refetchInterval: 2000,
  });

  if (isLoading || isFetching || error || !data) {
    if (error) console.log(error);
    return [];
  }
  return data;
}

export async function deleteChat(chatId: number) {
  const response = await fetch(`${REACT_APP_API_SERVER}/chatlist/${chatId}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.data;
}
