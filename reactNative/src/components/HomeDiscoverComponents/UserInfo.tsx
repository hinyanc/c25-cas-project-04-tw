import React, { useEffect, useState } from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetUsername } from '../../hooks/TinderAPI';
import { UserInfo } from '../../hooks/TinderAPI';


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
  
  let user = useGetUsername(token)
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
        <Image
          source={require('../../assets/img/day.jpeg')}
          style={{height: 80, width: 80, margin: 20, borderRadius: 15}}
        />
        <View style={{width: 250}}>
          <Text style={styles.hiName}>Hi, {user.}</Text>
          <Text style={styles.welcome}>Welcome back to GyMatess!</Text>
        </View>
      </View>
    </ScrollView>
  );
}
