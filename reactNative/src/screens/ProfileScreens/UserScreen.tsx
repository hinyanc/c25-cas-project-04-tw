import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {useGetInfo, useUpdateInfo} from '../../hooks/profileAPI';
import {Info, newInfo} from '../../hooks/profileAPI';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {FormErrorState, FormState} from '../SignUpScreen/SignUpScreen';
import LogoutBtn from '../../components/ProfileComponents/Logout';
type ButtonProps = {
  onPress: () => void;
  isPressed: boolean;
  text: string;
  textStyle?: TextStyle;
  btnType: string;
};

const UserScreen = () => {
  const showInfo: Info[] | undefined = useGetInfo();
  const [newItem, setNewItem] = useState<newInfo>(showInfo as unknown as Info);
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

  const [errorState, setErrorState] = useState<FormErrorState>({
    username: null,
    email: null,
    password: null,
    gender: null,
    birthday: null,
    height: null,
    weight: null,
    isMember: null,
    gymLevel: null,
    interests: null,
  });

  // interest
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests: string[] = [
    'Yoga',
    'Weightlifting',
    'Pilates',
    'Injury recover',
    'Aerobic',
    'Cardio',
    'Boxing',
    'Stretching',
  ];
  const handleInterestPress = (interest: string) => {
    const maxSelections = 5;
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests =>
        selectedInterests.filter(item => item !== interest),
      );
    } else if (selectedInterests.length < maxSelections) {
      setSelectedInterests(selectedInterests => [
        ...selectedInterests,
        interest,
      ]);
    }
  };

  const isInterestPressed = (interest: string) => {
    console.log(selectedInterests);
    return selectedInterests.includes(interest);
  };

  useEffect(() => {
    if (newItem && newItem.interest_names !== undefined)
      setSelectedInterests(newItem.interest_names);
  }, [newItem]);

  useEffect(() => {
    onChangeHandler('interests', selectedInterests);
  }, [selectedInterests]);

  const InterestButton = ({
    onPress,
    isPressed,
    text,
    textStyle,
    btnType,
  }: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[
          btnType === 'level'
            ? [styles.levelBtn, isPressed && styles.levelBtnPressed]
            : [styles.interestBtn, isPressed && styles.interestBtnPressed],
        ]}
        onPress={onPress}>
        <Text
          style={[
            btnType === 'level'
              ? [
                  styles.levelBtnText,
                  textStyle,
                  isPressed && styles.levelBtnTextPressed,
                ]
              : [
                  styles.interestBtnText,
                  textStyle,
                  isPressed && styles.interestToogleBtnText,
                ],
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const onChangeHandler = (
    name: string,
    value:
      | string
      | string[]
      | boolean
      | number
      | Date
      | DocumentPickerResponse
      | null,
  ) => {
    setNewItem({...newItem, [name]: value});
  };

  const moment = require('moment');
  let parsedDatetime;
  if (showInfo != undefined) {
    const oriDateTime = showInfo[0].birthday;

    if (oriDateTime != null) {
      parsedDatetime = moment(oriDateTime).format('YYYY-MM-DD');
    }
  }

  return (
    // {!showInfo? <Text>Loading...</Text>:<Text>hi</Text>}
    showInfo == undefined ? (
      <View style={styles.chatemptyContainer}>
        <Text style={styles.chatemptyText}>Loading ...</Text>
      </View>
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
                uri: `${REACT_APP_API_SERVER}/profile-pic/${showInfo[0]
                  .profile_pic!}`,
              }}
              style={styles.pprofilepic}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Username</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].username}
              onChangeText={text => setNewItem({...newItem, username: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Email</Text>
            <TextInput
              style={styles.profileinput}
              keyboardType="email-address"
              defaultValue={showInfo[0].email}
              onChangeText={text => setNewItem({...newItem, email: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Gender</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].gender}
              onChangeText={text => setNewItem({...newItem, gender: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Date of birth</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={parsedDatetime}
              onChangeText={text => setNewItem({...newItem, birthday: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Height</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].height.toString()}
              onChangeText={text => setNewItem({...newItem, height: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Weight</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].weight.toString()}
              onChangeText={text => setNewItem({...newItem, weight: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Gym center</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].gym_center}
              onChangeText={text => setNewItem({...newItem, gym_center: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Center location</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].gym_location}
              onChangeText={text =>
                setNewItem({...newItem, gym_location: text})
              }
            />
          </View>

          <View style={styles.profiledetails2}>
            <Text style={{marginTop:20}}>Bio</Text>
            <TextInput
              style={styles.profileinputbio}
              multiline
              defaultValue={showInfo[0].bio}
              onChangeText={text => setNewItem({...newItem, bio: text})}
            />
          </View>

          <View style={styles.profiledetails}>
            <Text>Gym level</Text>
            <TextInput
              style={styles.profileinput}
              defaultValue={showInfo[0].gym_level}
              onChangeText={text => setNewItem({...newItem, gym_level: text})}
            />
          </View>

          <View style={styles.profiledetails2}>
            <Text  style={{marginTop:20}}>Interests</Text>
            <View style={styles.profileinterestdetails}>
              {/* {showInfo[0].interest_names.map((interest, index) => (
                <InterestButton
                  key={index}
                  onPress={() => {
                    handleInterestPress(interest);
                  }}
                  isPressed={isInterestPressed(interest)}
                  text={interest}
                  textStyle={{color: '#F2B3B7'}}
                  btnType="interest"
                />
              ))} */}

              {interests.map((interest, index) => (
                <InterestButton
                  key={index}
                  onPress={() => handleInterestPress(interest)}
                  isPressed={isInterestPressed(interest)}
                  text={interest}
                  textStyle={{
                    color: isInterestPressed(interest) ? '#000000' : '#F2B3B7',
                  }}
                  btnType="interest"
                />
              ))}
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.updateBtn} onPress={updateUserInfo}>
            <Text style={styles.updateBtnText}>Update</Text>
          </TouchableOpacity>
          <LogoutBtn />
        </View>
      </ScrollView>
    )
  );
};

export default UserScreen;
