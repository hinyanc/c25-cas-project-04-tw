import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';

const API_URL = 'http://192.168.160.72:8080';

interface UserInfo {
  username: string;
}
interface TinderProfile {
  id: number;
  is_pt: boolean;
  gender: string;
  username: string;
  profile_pic: string;
  gym_center: string;
  gym_location: string;
  interest_name: string[];
  bio: string;
}

export function useGetUsername() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['getUsername'],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-user-info`);
      const result = await res.json();
      return result as UserInfo;
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetTinderProfile() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['tinderProfile'],
    queryFn: async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/discover/get-all-profile`,
      );
      const result = await res.json();
      console.log(result)
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetUserProfile() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-all-users`);
      const result = await res.json();
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetPTProfile() {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['PTProfile'],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-all-pt`);
      const result = await res.json();
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}
