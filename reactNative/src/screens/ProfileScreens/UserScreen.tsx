import React from 'react';
import {FlatList, Image, SafeAreaView, Text, View} from 'react-native';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';
import {TextInput} from 'react-native-gesture-handler';

const UserScreen = () => {
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

  return (
    <View>
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
