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
  interests: string[];
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
    interests: [],
  });

  const onChangeHandler = (e: any) => {
    setFormState({...formState, [e.target.name]: e.target.value});
  };

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
              }}
            />
          )}
          {sectionNum === 2 && (
            <SectionTwo
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(3);
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
              }}
            />
          )}
          {sectionNum === 4 && (
            <SectionFour
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(5);
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
