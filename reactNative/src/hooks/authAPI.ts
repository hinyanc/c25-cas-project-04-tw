import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function localLogin(email: string, password: string) {
  const res = await fetch(`${REACT_APP_API_SERVER}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const result = await res.json();
  if(res.status ===200){
    AsyncStorage.setItem('token',result.token)
    return true
  }else{
    return false
  }
}
