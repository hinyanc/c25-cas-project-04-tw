import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function localLogin(email: string, password: string) {
  try {
    console.log('fetching....', REACT_APP_API_SERVER);
    const res = await fetch(`${REACT_APP_API_SERVER}/auth/login`, {
    // const res = await fetch(`http://172.20.10.2:8080/auth/login`, {
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
    console.log('check result:', result);
    if (res.status === 200) {
      AsyncStorage.setItem('token', result.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
