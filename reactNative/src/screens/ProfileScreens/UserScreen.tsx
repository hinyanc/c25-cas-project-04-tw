import React, {useState} from 'react';
import {Button, Image, ScrollView, Text, TextInput, View} from 'react-native';
import {useGetInfo, useUpdateInfo} from '../../hooks/profileAPI';
import {Info, newInfo} from '../../hooks/profileAPI';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';

const UserScreen = async () => {
  const showInfo: Info = await useGetInfo();
  const [newItem, setNewItem] = useState<newInfo>(showInfo);
  console.log(showInfo);

  const updateUserInfo = async () => {
    const updatedData = await useUpdateInfo(
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
  if (!showInfo) {
    return <Text>Loading...</Text>;
  }
  return (
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
            value={showInfo.username}
            onChangeText={text => setNewItem({...newItem, username: text})}
          />
        </View>

        <View>
          <Text>Email</Text>
          <TextInput
            keyboardType="email-address"
            value={showInfo.email}
            onChangeText={text => setNewItem({...newItem, email: text})}
          />
        </View>

        <View>
          <Text>Gender</Text>
          <TextInput
            value={showInfo.gender}
            onChangeText={text => setNewItem({...newItem, gender: text})}
          />
        </View>

        <View>
          <Text>Date of birth</Text>
          <TextInput
            value={showInfo.birthday.toString()}
            onChangeText={text =>
              setNewItem({...newItem, birthday: new Date(text)})
            }
          />
        </View>

        <View>
          <Text>Height</Text>
          <TextInput
            value={showInfo.height.toString()}
            onChangeText={text =>
              setNewItem({...newItem, height: Number(text)})
            }
          />
        </View>

        <View>
          <Text>Weight</Text>
          <TextInput
            value={showInfo.weight.toString()}
            onChangeText={text =>
              setNewItem({...newItem, weight: Number(text)})
            }
          />
        </View>

        <View>
          <Text>Gym center</Text>
          <TextInput
            value={showInfo.gym_center}
            onChangeText={text => setNewItem({...newItem, gym_center: text})}
          />
        </View>

        <View>
          <Text>Center location</Text>
          <TextInput
            value={showInfo.gym_location}
            onChangeText={text => setNewItem({...newItem, gym_location: text})}
          />
        </View>

        <View>
          <Text>Bio</Text>
          <TextInput
            value={showInfo.bio}
            onChangeText={text => setNewItem({...newItem, bio: text})}
          />
        </View>

        <View>
          <Text>Gym level</Text>
          <TextInput
            value={showInfo.gym_level}
            onChangeText={text => setNewItem({...newItem, gym_level: text})}
          />
        </View>

        <View>
          <Text>Interests</Text>
          <TextInput
            value={showInfo.interest_names}
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
  );
};

export default UserScreen;
