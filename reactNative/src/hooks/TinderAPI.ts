import {useQuery} from '@tanstack/react-query';

const API_URL = 'http://192.168.160.72:8080';

interface TinderProfile{
    is_PT: boolean,
    username: string,
    gym_center:string,
    gym_location: string,
    interest: string,
    bio: string
}

// export function useGet