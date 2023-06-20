import React, {useState} from 'react';
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
import { Image } from 'react-native';

const {width, height} = Dimensions.get('window');

interface SectionFiveProps {
  next: () => void;
  back: () => void;
  errorState: FormErrorState;
  formState: FormState;
  onChangeHandler: (name: string, value: string | number | Date) => void;
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

  const [uploadImage, setuploadImage] = useState(null);

  const pickImage = async () => {
    try {
      const result: DocumentPickerResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setuploadImage(result);
      console.log(
        result.uri,
        result.type, // mime type
        result.name,
        result.size,
      );
      // do something with the selected file
    } catch (error) {
      console.log(error);
    }
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

      <TouchableOpacity
      onPress={pickImage}
      style={styles.Continuebtn}>
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
      {uploadImage? <Image source={{uri:uploadImage}}/>: <></> }

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
          inputHandler('gender');
          inputHandler('birthday');
          inputHandler('height');
          inputHandler('weight');
          if (
            errorState.gender === null &&
            errorState.birthday === null &&
            errorState.height === null &&
            errorState.weight === null
          ) {
            next();
          }
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
