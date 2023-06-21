import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';

export interface Info {
  profile_pic: string;
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

export interface newInfo {
  profile_pic: string;
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

export function useGetInfo() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['showInfo'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem('token');
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

export async function useUpdateInfo(
  profile_pic: string,
  username: string,
  email: string,
  gender: string,
  birthday: Date,
  height: number,
  weight: number,
  bio: string,
  gym_level: string,
  interest: string,
  gym_center: string,
  gym_location: string,
) {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(`${REACT_APP_API_SERVER}/profile/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      profile_pic: profile_pic,
      username: username,
      email: email,
      gender: gender,
      birthday: birthday,
      height: height,
      weight: weight,
      bio: bio,
      gym_level: gym_level,
      interest: interest,
      gym_center: gym_center,
      gym_location: gym_location,
    }),
  });

  const result = await res.json();
  return {result};
}
