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

export function useGetMessages(targetUserId: string, token: string) {
  console.log('get message', targetUserId, token);
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['message', targetUserId, token],
    queryFn: async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/message/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await res.json();
      return result as Message[];
    },
    refetchInterval: 10000,
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
  token: string,
) {
  console.log('check create message', token);
  const res = await fetch(`${REACT_APP_API_SERVER}/message/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
