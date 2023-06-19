import {useMutation, useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BMI {
  weight: number;
  height: number;
}

export interface Goals {
  id: number;
  name: string;
  is_completed: boolean
}
export function useGetBMI(token: string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['getbmi', token],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/goal/get-bmi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result as BMI;
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetGoals(token: string, render:boolean) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['getgoals', token, render],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/goal/get-goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      return result as Goals[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}
