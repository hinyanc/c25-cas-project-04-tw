// import {REACT_APP_API_SERVER} from '@env';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export async function localLogin(email: string, password: string) {
//   try{

//     const res = await fetch(`${REACT_APP_API_SERVER}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     const result = await res.json();
//     console.log("check result:",result)
//     if(res.status ===200){
//       AsyncStorage.setItem('token',result.token)
//       return true
//     }else{
//       return false
//     }
//   }catch(error){
//     console.error("Error:",error)
//     throw error
//   }
// }
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export async function localLogin(email: string, password: string) {
  console.log("check login api url",REACT_APP_API_SERVER)
  try {
    const response = await axios.post(`${REACT_APP_API_SERVER}/auth/login`, {
      email,
      password,
    });

    console.log('check result:', response.data);

    if (response.status === 200) {
      AsyncStorage.setItem('token', response.data.token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
