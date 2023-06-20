import {REACT_APP_API_SERVER} from '@env';
import { useQuery } from '@tanstack/react-query';

export interface Info {
    profile_pic: string
    username: string;
    email: string;
    gender: string;
    birthday: Date;
    height: number;
    weight: number;
    bio: string;
    gym_level: string;
    interest: string;
    gym_center: string;
    gym_location: string;
  }

export function useGetInfo(token: string) {
    const {isLoading, error, data, isFetching} = useQuery({
      queryKey: ['getbmi', token],
      queryFn: async () => {
        const res = await fetch(`${REACT_APP_API_SERVER}/profile/info`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        return result as Info[];
      },
    });
  
    if (isLoading || isFetching || error || !data) {
      return [];
    }
  
    return data;
  }