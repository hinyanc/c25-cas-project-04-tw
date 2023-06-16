import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Message {
  sender_id: Number;
  receiver_id: Number;
  updated_at: Date;
  message: string;
  sender_username: string;
  receiver_username: string;
}

const target_user_id = 2;

export function useGetMessages(targetUserId: string, token: string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['message', targetUserId, token],
    queryFn: async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/message/mainUserId/targetUserId/${targetUserId}`,
        {
          headers: {
            Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
          },
        },
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
      Authorization: `Bearer ${AsyncStorage.getItem('token')}`,
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
