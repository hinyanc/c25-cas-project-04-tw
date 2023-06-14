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
} from 'react-native';
import SectionOne from '../../components/SignUpComponents/SectionOne';
import SectionTwo from '../../components/SignUpComponents/SectionTwo';
import SectionThree from '../../components/SignUpComponents/SectionThree';
import SectionFour from '../../components/SignUpComponents/SectionFour';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../../../App';
const {width, height} = Dimensions.get('window');

export interface FormState {
  username: string;
  email: string;
  password: string;
  gender: string;
  birthday: string;
  height: string;
  weight: string;
  isMember: boolean;
  gymCenter: string;
  locaiton: string;
  bio: string;
  gymLevel: string;
  interests: string[]|null;
}

//height weight  parse int
export default function SignUpForm() {
  const [sectionNum, setSectionNum] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    height: "",
    weight: "",
    isMember: false,
    gymCenter: '',
    locaiton: '',
    bio: '',
    gymLevel: '',
    interests: null,
  });

//   const onChangeHandler = (e: any) => {
//     setFormState({...formState, [e.target.name]: e.target.value});
//   };

  const onChangeHandler = (name: string, value: string|string[]) => {
    setFormState({...formState, [name]: value});
  };

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
      }}>
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
          }}>
          {sectionNum === 1 && (
            <SectionOne
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(2);
                console.log("p1",formState)
              }}
            />
          )}
          {sectionNum === 2 && (
            <SectionTwo
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(3);
                console.log("p2",formState)

              }}
              back={() => {
                setSectionNum(1);
              }}
            />
          )}
          {sectionNum === 3 && (
            <SectionThree
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(4);
                console.log("p3",formState)

              }}
              back={() => {
                setSectionNum(2);
              }}
            />
          )}
          {sectionNum === 4 && (
            <SectionFour
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                // setSectionNum(5);
                //validate if success
                // show success and redirect to login
                navigation.navigate("Login")
              }}
              back={() => {
                setSectionNum(3);
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
