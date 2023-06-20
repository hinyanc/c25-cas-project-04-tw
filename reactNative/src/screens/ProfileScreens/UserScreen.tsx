import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = () => {
  const [mainUser, setMainUser] = useState('');
  const [token, setToken] = useState('');
  const item = {
    profile_pic: 'profile_pic',
    username: 'XXXXXXXX',
    email: 'XXXXXXXX',
    gender: 'XXXXXXXX',
    date_of_birth: 'XXXXXXXX',
    height: 'XXXXXXXX',
    weight: 'XXXXXXXX',
    gym_center: 'XXXXXXXX',
    bio: 'XXXXXXXX',
    gym_level: 'XXXXXXXX',
    interests: 'XXXXXXXX',
  };

  const getAsyncInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      const token = await AsyncStorage.getItem('token');

      if (value !== null) {
        setMainUser(value);
        setToken(token!);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  useEffect(() => {
    getAsyncInfo();
    return () => {};
  }, []);

  return (
    <View style={{backgroundColor: '#FFF9F0'}}>
      <SafeAreaView style={styles.profilescreen}>
        <View style={styles.prpfiletopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.profileheading}>My Profile</Text>
          </View>
        </View>
        <View style={styles.profilelistContainer}>
          <View>
            <Image
              source={{
                uri: `${REACT_APP_API_SERVER}/profile-pic/${item.profile_pic}`,
              }}
              style={styles.cprofilepic}
            />
          </View>

          <View>
            <Text>Username</Text>
            <TextInput defaultValue="${item.username}"></TextInput>
          </View>

          <View>
            <Text>email</Text>
            <TextInput defaultValue="${item.email}"></TextInput>
          </View>

          <View>
            <Text>gender</Text>
            <TextInput defaultValue="${item.gender}"></TextInput>
          </View>

          <View>
            <Text>date_of_birth</Text>
            <TextInput defaultValue="${item.date_of_birth}"></TextInput>
          </View>

          <View>
            <Text>height</Text>
            <TextInput defaultValue="${item.height}"></TextInput>
          </View>

          <View>
            <Text>gym_center</Text>
            <TextInput defaultValue="${item.gym_center}"></TextInput>
          </View>

          <View>
            <Text>interests</Text>
            <TextInput defaultValue="${item.interests"></TextInput>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UserScreen;

// <View style={styles.profileemptyContainer}>
//   <Text style={styles.profileemptyText}>No rooms created!</Text>
//   <Text>❤️ Go to discover and match your new gyMatess! ❤️</Text>
// </View>;
