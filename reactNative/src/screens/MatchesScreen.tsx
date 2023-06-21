import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import users from '../assets/data/users';
import {REACT_APP_API_SERVER} from '@env';
import {socket} from '../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetUsername} from '../hooks/TinderAPI';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../App';

const MatchesScreen = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    console.log('joining server', socket.id);
    if (token !== '') {
      socket.emit('join', {
        socketId: socket.id,
        token: token,
      });
    }
  }, [token]);

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
  let userInfo = Object.values(user);
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#E24E59'}}>
          It's a Match!
        </Text>
        <Text style={{fontSize: 16, color: '#E24E59'}}>
          You and ??? have liked each other.
        </Text>
        <View>
          <Image
            style={{height: 80, width: 80, margin: 20, borderRadius: 50}}
            source={{uri: `${REACT_APP_API_SERVER}/profile-pic/${userInfo[1]}`}}
          />
        </View>
        <Text>
          Let's click{' '}
          <Text
            style={{
              fontWeight: 'bold',
              textDecorationLine: 'underline',
              fontSize: 25,
              color: '#E24E59',
            }}
            onPress={() => {
              navigation.navigate('Chat');
            }}>
            HERE
          </Text>{' '}
          to start chatting with each other!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: 'rgb(252, 215, 221)',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // flexDirection:'row'
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: '#F63A6E',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});

export default MatchesScreen;
