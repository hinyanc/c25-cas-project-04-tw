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

export function useGetMessages(targetUserId: string) {
  const {isLoading, error, data} = useQuery({
    queryKey: ['message', {targetUserId}],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(
        `${REACT_APP_API_SERVER}/message/${targetUserId}`,
        {headers: {Authorization: `Bearer ${token}`}},
      );
      const result = await res.json();
      return result as Message[];
    },
    retry: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  if (isLoading || error || !data) {
    return [];
  }

  return data;
}

export async function useCreateMessages(
  message: string,
  target_user_id: string,
) {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${REACT_APP_API_SERVER}/message/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      message: message,
      targetUserId: target_user_id,
    }),
  });

  const result = await res.json();
  return {result, target_user_id};
}

export async function connectSocket(target_user_id: string) {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(
      `${REACT_APP_API_SERVER}/getSocketId/userId/${target_user_id}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('check data', data);
  } catch (e) {
    console.error(e);
  }
}
