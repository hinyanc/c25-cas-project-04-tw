import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
interface Message {
  sender_id: Number;
  receiver_id: Number;
  updated_at: Date;
  message: string;
  sender_username: string;
  receiver_username: string;
}

const target_user_id = 2;

export function useGetMessages(mainUserId: string, targetUserId: string) {
  console.log('api check', mainUserId);
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['message', mainUserId, targetUserId],
    queryFn: async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/message/mainUserId/${mainUserId}/targetUserId/${targetUserId}`,
      );
      const result = await res.json();
      return result as Message[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export async function useCreateMessages(
  message: string,
  target_user_id: number,
  main_user_id: number,
) {
  const res = await fetch(`${REACT_APP_API_SERVER}/message/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: message,
      targetUserId: target_user_id,
      mainUserId: main_user_id,
    }),
  });

  const result = await res.json();
  return result;
}
