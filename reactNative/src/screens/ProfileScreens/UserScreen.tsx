import React, {useState} from 'react';
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useGetInfo, useUpdateInfo} from '../../hooks/profileAPI';
import {Info, newInfo} from '../../hooks/profileAPI';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';

const UserScreen = () => {
  const showInfo: Info | undefined = useGetInfo();
  const [newItem, setNewItem] = useState<newInfo>(showInfo as Info);
  console.log('showInfo:', showInfo);

  const updateUserInfo = () => {
    const updatedData = useUpdateInfo(
      newItem.profile_pic,
      newItem.username,
      newItem.email,
      newItem.gender,
      newItem.birthday,
      newItem.height,
      newItem.weight,
      newItem.bio,
      newItem.gym_level,
      newItem.interest_names,
      newItem.gym_center,
      newItem.gym_location,
    );
    console.log(updatedData);
  };

  return (
    // {!showInfo? <Text>Loading...</Text>:<Text>hi</Text>}
    showInfo == undefined ? (
      <Text>Loading ...</Text>
    ) : (
      <ScrollView style={styles.profileScreen}>
        <View style={styles.profileTopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.profileHeading}>My Profile</Text>
          </View>
        </View>
        <View style={styles.profilelistContainer}>
          <View>
            <Image
              source={{
                uri: `${REACT_APP_API_SERVER}/profile-pic/${showInfo.profile_pic}`,
              }}
              style={styles.cprofilepic}
            />
          </View>

          <View>
            <Text>Username</Text>
            <TextInput
              defaultValue={showInfo.username}
              onChangeText={text => setNewItem({...newItem, username: text})}
            />
          </View>

          <View>
            <Text>Email</Text>
            <TextInput
              keyboardType="email-address"
              defaultValue={showInfo.email}
              onChangeText={text => setNewItem({...newItem, email: text})}
            />
          </View>

          <View>
            <Text>Gender</Text>
            <TextInput
              defaultValue={showInfo.gender}
              onChangeText={text => setNewItem({...newItem, gender: text})}
            />
          </View>

          <View>
            <Text>Date of birth</Text>
            <TextInput
              defaultValue={showInfo.birthday}
              onChangeText={text => setNewItem({...newItem, birthday: text})}
            />
          </View>

          <View>
            <Text>Height</Text>
            <TextInput
              defaultValue={showInfo.height}
              onChangeText={text => setNewItem({...newItem, height: text})}
            />
          </View>

          <View>
            <Text>Weight</Text>
            <TextInput
              defaultValue={showInfo.weight}
              onChangeText={text => setNewItem({...newItem, weight: text})}
            />
          </View>

          <View>
            <Text>Gym center</Text>
            <TextInput
              defaultValue={showInfo.gym_center}
              onChangeText={text => setNewItem({...newItem, gym_center: text})}
            />
          </View>

          <View>
            <Text>Center location</Text>
            <TextInput
              defaultValue={showInfo.gym_location}
              onChangeText={text =>
                setNewItem({...newItem, gym_location: text})
              }
            />
          </View>

          <View>
            <Text>Bio</Text>
            <TextInput
              defaultValue={showInfo.bio}
              onChangeText={text => setNewItem({...newItem, bio: text})}
            />
          </View>

          <View>
            <Text>Gym level</Text>
            <TextInput
              defaultValue={showInfo.gym_level}
              onChangeText={text => setNewItem({...newItem, gym_level: text})}
            />
          </View>

          <View>
            <Text>Interests</Text>
            <TextInput
              defaultValue={showInfo.interest_names}
              onChangeText={text =>
                setNewItem({...newItem, interest_names: text})
              }
            />
          </View>
        </View>

        <View>
          <Button title="Update" onPress={updateUserInfo} />
        </View>
      </ScrollView>
    )
  );
};

export default UserScreen;
