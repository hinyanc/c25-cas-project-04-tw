import {useQuery} from '@tanstack/react-query';
interface Message {
  sender_id: Number;
  receiver_id: Number;
  updated_at: Date;
  message: string;
  sender_username: string;
  receiver_username: string;
}

const API_URL = 'http://192.168.160.72:8080';
const main_user_id = 1;
const target_user_id = 2;

export function useGetMessages() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['Messages'],
    queryFn: async () => {
      const res = await fetch(
        `${API_URL}/message/mainUserId/${main_user_id}/targetUserId/${target_user_id}`,
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
  const res = await fetch(`${API_URL}/message/`, {
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
