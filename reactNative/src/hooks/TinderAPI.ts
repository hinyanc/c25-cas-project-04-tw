import {useQuery} from '@tanstack/react-query';
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_URL = 'http://192.168.160.72:8080';

export interface UserInfo {
  username: string;
  profile_pic: string
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

export function useGetUsername(token:string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['getUsername',token],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-user-info`,
      {
        headers:{
          "Authorization":`Bearer ${token}` 
        }
      });
      const result = await res.json();
      return result as UserInfo[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetTinderProfile(token:string) {
  let real_token = AsyncStorage.getItem('token')
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['tinderProfile',token],
    queryFn: async () => {
      const res = await fetch(
        `${REACT_APP_API_SERVER}/discover/get-all-profile`, {
          headers:{
            "Authorization":`Bearer ${token}` 
          }
        }
      );
      const result = await res.json();
      console.log("API check token",result)
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetUserProfile(token:string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['userProfile', token],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-all-users`, {
        headers:{
          "Authorization":`Bearer ${token}` 
        }
      });
      const result = await res.json();
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}

export function useGetPTProfile(token:string) {
  const {isLoading, error, data, isFetching} = useQuery({
    queryKey: ['PTProfile', token],
    queryFn: async () => {
      const res = await fetch(`${REACT_APP_API_SERVER}/discover/get-all-pt`, {
        headers:{
          "Authorization":`Bearer ${token}` 
        }
      });
      const result = await res.json();
      return result as TinderProfile[];
    },
  });

  if (isLoading || isFetching || error || !data) {
    return [];
  }

  return data;
}
