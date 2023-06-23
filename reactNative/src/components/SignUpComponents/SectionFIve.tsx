import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextStyle,
} from 'react-native';

import {styles} from '../../utils/signUpStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {
  FormErrorState,
  FormState,
} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {Image} from 'react-native';
import {REACT_APP_API_SERVER} from '@env';

const {width, height} = Dimensions.get('window');

interface SectionFiveProps {
  next: () => void;
  back: () => void;
  errorState: FormErrorState;
  formState: FormState;
  onChangeHandler: (
    name: string,
    value: string | number | Date | DocumentPickerResponse | null,
  ) => void;
  inputHandler: (name: keyof FormState) => void;
}

export default function SectionFive({
  next,
  back,
  formState,
  onChangeHandler,
  errorState,
  inputHandler,
}: SectionFiveProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [uploadImage, setuploadImage] = useState<DocumentPickerResponse | null>(
    null,
  );

  useEffect(() => {
    if (formState.profile_pic) setuploadImage(formState.profile_pic);
  }, []);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setuploadImage(result[0] || null);
      onChangeHandler('profile_pic', result[0]);
      // do something with the selected file
    } catch (error) {
      console.log(error);
    }
  };
  const submitForm = async () => {
    const formData = new FormData();
    formData.append('username', formState.username);
    formData.append('email', formState.email);
    formData.append('password', formState.password);
    formData.append('gender', formState.gender);
    formData.append('birthday', formState.birthday);
    formData.append('height', formState.height);
    formData.append('weight', formState.weight);
    formData.append('has_member', formState.isMember);
    formData.append('gym_center_id', formState.gymCenter);
    formData.append('gym_locaiton_id', formState.locaiton);
    formData.append('bio', formState.bio);
    formData.append('gym_level', formState.gymLevel);
    formData.append('interestArr',JSON.stringify(formState.interests));
    formData.append('profile_pic', formState.profile_pic);

    const res = await fetch(`${REACT_APP_API_SERVER}/signUp`, {
      method: 'POST',
      body: formData,
    });

    const result = await res;
    console.log('check signup fetch result', result);
  };

  return (
    <View
      style={{
        marginBottom: height * 0.13,
        marginTop: height * 0.04,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={e => {
            back();
          }}>
          <Ionicons name="arrow-back" size={30} style={{}}></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'right',
            color: '#e24e59',
            fontWeight: 'bold',
          }}>
          STEP 5/5
        </Text>
      </View>
      {uploadImage ? (
        <Image
          source={{uri: uploadImage.uri}}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
        />
      ) : (
        <Text>No image selected</Text>
      )}

      <TouchableOpacity onPress={pickImage} style={styles.Continuebtn}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Upload your profile image
        </Text>
      </TouchableOpacity>

      {/* remind */}
      <Text
        style={{
          // textDecorationLine: 'underline',
          textAlign: 'center',
          width: width * 0.75,
          marginBottom: height * 0.02,
        }}>
        By continuing, you agree to Gymatess's Terms of service. We will manage
        information about you as described in our Privacy Policy, and Cookie
        Policy.
      </Text>

      {/* ///continue button */}
      <TouchableOpacity
        onPress={e => {
          e.preventDefault;
          // not working
          console.log('check formState', formState);
          submitForm();
        }}
        style={styles.Continuebtn}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
