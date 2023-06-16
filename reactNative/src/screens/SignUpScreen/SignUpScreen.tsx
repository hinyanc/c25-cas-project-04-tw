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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {z} from 'zod';

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
  gymCenter: number|null;
  locaiton: number|null;
  bio: string;
  gymLevel: string;
  interests: string[] | null;
}

export interface FormErrorState {
  username: string | null;
  email: string | null;
  password: string | null;
  gender: string | null;
  birthday: string | null;
  height: string | null;
  weight: string | null;
  isMember: string | null;
  gymLevel: string | null;
  interests: string | null;
}

export const schema = {
  username: z.string().min(1, {message: 'Username is required'}),
  email: z.string().email({message: 'Must be a valid email'}),
  password: z.string().min(6, {message: 'Password is required'}),
  gender: z.string().min(4, {message: 'Please fill in your gender'}),
  // not sure
  birthday: z.string().datetime({message: 'Please fill in your birthday'}),
  height: z.number().int({message: 'Please fill in your height'}),
  weight: z.number().int({message: 'Please fill in your weight'}),
  isMember: z.boolean({
    required_error: 'This column is required',
    invalid_type_error: 'IsMember must be a boolean',
  }),
  gymLevel: z.string().min(1, {message: 'Please choose your gymlevel'}),
  interests: z
    .string()
    .array()
    .min(1, {message: 'Choose at least one interest'}),
} as {
  [x: string]:
    | z.ZodString
    | z.ZodNumber
    | z.ZodBoolean
    | z.ZodArray<z.ZodString, 'many'>;
};

//height weight  parse int
export default function SignUpForm() {
  const [sectionNum, setSectionNum] = useState(1);
  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
    gender: '',
    birthday: '',
    height: '',
    weight: '',
    isMember: false,
    gymCenter: null,
    locaiton: null,
    bio: '',
    gymLevel: '',
    interests: null,
  });

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
  //   const onChangeHandler = (e: any) => {
  //     setFormState({...formState, [e.target.name]: e.target.value});
  //   };
  const inputHandler = (name: keyof FormState) => {
    const value = formState[name];

    try {
      schema[name].parse(value);
      setErrorState({...errorState, [name]: null});
    } catch (err) {
      setErrorState({
        ...errorState,
        [name]: (err as z.ZodError).errors[0].message,
      });
    }
  };

  const onChangeHandler = (
    name: string,
    value: string | string[] | boolean|number,
  ) => {
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
                console.log('p1', formState);
              }}
              inputHandler={inputHandler}
              errorState={errorState}
            />
          )}
          {sectionNum === 2 && (
            <SectionTwo
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(3);
                console.log('p2', formState);
              }}
              back={() => {
                setSectionNum(1);
              }}
              inputHandler={inputHandler}
              errorState={errorState}
            />
          )}
          {sectionNum === 3 && (
            <SectionThree
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                setSectionNum(4);
                console.log('p3', formState);
              }}
              back={() => {
                setSectionNum(2);
              }}
              inputHandler={inputHandler}
              errorState={errorState}
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

                navigation.navigate('Login');
              }}
              back={() => {
                setSectionNum(3);
              }}
              inputHandler={inputHandler}
              errorState={errorState}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
