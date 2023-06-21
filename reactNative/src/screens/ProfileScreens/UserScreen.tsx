import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';
import LogoutBtn from '../../components/ProfileComponents/Logout';
import {newInfo, useGetInfo, useUpdateInfo} from '../../hooks/profileAPI';
import {Info} from '../../hooks/profileAPI';

const UserScreen = () => {
  const item: Info[] = useGetInfo();
  const newItem: newInfo[] = useUpdateInfo();

  return (
    <ScrollView style={styles.profileScreen}>
      <View style={styles.profileTopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.profileHeading}>My Profile</Text>
          <LogoutBtn />
        </View>
      </View>
      <View style={styles.profilelistContainer}>
        <View>
          <Image
            source={{
              uri: `${REACT_APP_API_SERVER}/profile-pic/${item[0].profile_pic}`,
            }}
            style={styles.cprofilepic}
          />
        </View>

        <View>
          <Text>Username</Text>
          <TextInput defaultValue={item[0].username}></TextInput>
        </View>

        <View>
          <Text>Email</Text>
          <TextInput
            keyboardType="email-address"
            defaultValue={item[0].email}></TextInput>
        </View>

        <View>
          <Text>Gender</Text>
          <TextInput defaultValue={item[0].gender}></TextInput>
        </View>

        <View>
          <Text>Date of birth</Text>
          <TextInput defaultValue={item[0].birthday}></TextInput>
        </View>

        <View>
          <Text>Height</Text>
          <TextInput defaultValue={item[0].height}></TextInput>
        </View>

        <View>
          <Text>Weight</Text>
          <TextInput defaultValue={item[0].weight}></TextInput>
        </View>

        <View>
          <Text>Gym center</Text>
          <TextInput defaultValue={item[0].gym_center}></TextInput>
        </View>

        <View>
          <Text>Center location</Text>
          <TextInput defaultValue={item[0].gym_location}></TextInput>
        </View>

        <View>
          <Text>Bio</Text>
          <TextInput defaultValue={item[0].bio}></TextInput>
        </View>

        <View>
          <Text>Gym level</Text>
          <TextInput defaultValue={item[0].gym_level}></TextInput>
        </View>

        <View>
          <Text>interests</Text>
          <TextInput defaultValue={item[0].interest}></TextInput>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserScreen;

// <View style={styles.profileemptyContainer}>
//   <Text style={styles.profileemptyText}>No rooms created!</Text>
//   <Text>❤️ Go to discover and match your new gyMatess! ❤️</Text>
// </View>;
