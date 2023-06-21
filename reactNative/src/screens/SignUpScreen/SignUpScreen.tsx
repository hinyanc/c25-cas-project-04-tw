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
import SectionFive from '../../components/SignUpComponents/SectionFIve';
import {DocumentPickerResponse} from 'react-native-document-picker';

const {width, height} = Dimensions.get('window');

// const submitForm = async () => {
//   const formData = new FormData();
//   formData.append('file', {
//     uri: profile_pic.uri,
//     type: profile_pic.type,
//     name: profile_pic.name,
//   })
//   formData.append("username",username)
//   formData.append("email",email)
//   formData.append("password",password)
//   formData.append("gender",gender)
//   formData.append("birthday",birthday)
//   formData.append("height",height)
//   formData.append("weight",weight)
//   formData.append("has_member",isMember)
//   formData.append("gym_center_id",gymCenter)
//   formData.append("gym_locaiton_id",locaiton)
//   formData.append("bio",bio)
//   formData.append("gym_level",gymLevel)
//   formData.append("interestArr",interests)
//   formData.append("profile_pic",profile_pic)
// }

export interface FormState {
  username: string;
  email: string;
  password: string;
  gender: string;
  birthday: string | null;
  height: number | null;
  weight: number | null;
  isMember: boolean;
  gymCenter: number | null;
  locaiton: number | null;
  bio: string;
  gymLevel: string;
  interests: string[] | null;
  profile_pic: DocumentPickerResponse | null;
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
  //missing profile pic
}

export const schema = {
  username: z.string().min(1, {message: 'Username is required'}),
  email: z.string().email({message: 'Must be a valid email'}),
  password: z.string().min(6, {message: 'Password is required'}),
  gender: z.string().min(4, {message: 'Please fill in your gender'}),
  // not sure is it date
  birthday: z.string().datetime({message: 'Please fill in your birthday'}),
  // should have min
  height: z.number().min(120, 'invalid height.'),
  weight: z.number().min(30, 'invalid weight.'),
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
    username: 'test1',
    email: 'test1@gmail.com',
    password: 'abc123',
    gender: 'Female',
    birthday: new Date().toDateString(),
    height: 175,
    weight: 65,
    isMember: true,
    gymCenter: 1,
    locaiton: 1,
    bio: 'Hello World',
    gymLevel: 'Newbie',
    interests: ['Yoga'],
    // intersts need to json stringify
    profile_pic: null,
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
    value:
      | string
      | string[]
      | boolean
      | number
      | Date
      | DocumentPickerResponse
      | null,
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
              // next={() => {
              //   // setSectionNum(5);
              //   //validate if success
              //   //toast
              //   // show success and redirect to login

              //   navigation.navigate('Login');
              // }}
              next={() => {
                setSectionNum(5);
                console.log('p4', formState);
              }}
              back={() => {
                setSectionNum(3);
              }}
              inputHandler={inputHandler}
              errorState={errorState}
            />
          )}
          {/* image upload */}
          {sectionNum === 5 && (
            <SectionFive
              formState={formState}
              onChangeHandler={onChangeHandler}
              next={() => {
                // setSectionNum(5);
                //validate if success
                //toast
                // show success and redirect to login

                navigation.navigate('Login');
              }}
              back={() => {
                setSectionNum(4);
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
