import {useQuery} from '@tanstack/react-query';

interface Message {
  sender_id: Number;
  receiver_id: Number;
  updated_at: Date;
  message: string;
  sender_username: string;
  receiver_username: string;
}

export function useGetMessages() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['Messages'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8080/message');
      const result = await res.json();
      return result.data as Message[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export async function useCreateMessages(message: string) {
  const res = await fetch('http://localhost:8080/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({message}),
  });

  const result = await res.json();
  return result.data;
}

// export async function useDeleteMessage(id: Number) {

// }
