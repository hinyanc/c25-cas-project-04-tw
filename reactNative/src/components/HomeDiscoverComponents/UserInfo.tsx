import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetUsername} from '../../hooks/TinderAPI';
import { REACT_APP_API_SERVER } from '@env';

export function UserInfo() {
  const [token, setToken] = useState('');

  const getLocalStorage = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token == null) {
      console.log('token is not in storage');
    } else {
      setToken(token!);
      console.log('check get async storage token', token);
    }
  };
  useEffect(() => {
    getLocalStorage();
  });

  let user = useGetUsername(token);
  let userInfo = Object.values(user)
  // let profile_pic = Object.values(user[0])

  console.log(userInfo)
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        shadowColor: '#CB1F2C',
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 5,
      }}>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <>
          {user.length != 0 ? (
            <>
              <Image
                source={{uri: `${REACT_APP_API_SERVER}/profile-pic/${userInfo[1]}`}}
                style={{height: 80, width: 80, margin: 20, borderRadius: 15}}
              />
              <View style={{width: 250}}>
                <Text style={styles.hiName}>Hi, {userInfo[0].username} </Text>
                <Text style={styles.welcome}>Welcome back to GyMatess!</Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </>
      </View>
    </ScrollView>
  );
}
