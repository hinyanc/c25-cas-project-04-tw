import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {styles} from '../../utils/signUpStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {
  FormErrorState,
  FormState,
} from '../../screens/SignUpScreen/SignUpScreen';

const {width, height} = Dimensions.get('window');

interface SectionOneProps {
  next: () => void;
  formState: FormState;
  errorState: FormErrorState;
  onChangeHandler: (name: string, value: string) => void;
  inputHandler: (name: keyof FormState) => void;
}

export default function SectionOne({
  next,
  formState,
  onChangeHandler,
  inputHandler,
  errorState,
}: SectionOneProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  // continue button only click once
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    // Disable the button after a single click
    setButtonDisabled(true);

    // Perform your desired action here

    // delay 1 seconds before re-enabling the button
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1001);
  };

  return (
    <View
      style={{
        marginBottom: height * 0.07,
      }}>
      <Text
        style={{
          textAlign: 'right',
          color: '#e24e59',
          fontWeight: 'bold',
        }}>
        STEP 1/5
      </Text>
      {/* title */}
      <Text style={[styles.title, {marginBottom: height * 0.01}]}>Signup</Text>
      {/* input */}
      <View style={{height: height * 0.2}}>
        <Text style={styles.inputTitle}>Username*</Text>
        <TextInput
          value={formState.username}
          placeholder="Username"
          onChangeText={text => onChangeHandler('username', text)}
          onBlur={e => inputHandler('username')}
          style={styles.input}
        />
        {errorState.username !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.username}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={{height: height * 0.2}}>
        <Text style={styles.inputTitle}>Email address*</Text>
        <TextInput
          value={formState.email}
          onChangeText={text => onChangeHandler('email', text)}
          onBlur={e => inputHandler('email')}
          placeholder="Email"
          style={styles.input}
        />
        {errorState.email !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.email}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={{height: height * 0.2}}>
        <Text style={styles.inputTitle}>Password*</Text>
        <TextInput
          secureTextEntry
          value={formState.password}
          onChangeText={text => onChangeHandler('password', text)}
          onBlur={e => inputHandler('password')}
          placeholder="Password"
          style={styles.input}
        />
        {errorState.password !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.password}</Text>
        ) : (
          <></>
        )}
      </View>

      {/* remind */}
      <Text
        style={{
          textAlign: 'center',
          width: width * 0.75,
          marginBottom: height * 0.01,
        }}>
        Your name will be public and we'll send updates to the email address you
        provide.
      </Text>

      {/* ///continue button */}
      <TouchableOpacity
        disabled={isButtonDisabled}
        onPress={e => {
          e.preventDefault;
          handleButtonClick;

          inputHandler('username');
          inputHandler('email');
          inputHandler('password');
          setTimeout(() => {
            if (
              errorState.username === null &&
              errorState.email === null &&
              errorState.password === null
            ) {
              next();
            }
          }, 1000);
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
          Continue
        </Text>
      </TouchableOpacity>
      {/* have account back to login */}
      <Text
        style={{
          textAlign: 'center',
          width: width * 0.75,
          marginTop: 5,
        }}>
        Already have an account?
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
          }}
          onPress={() => {
            navigation.navigate('Login');
            // sign up
          }}>
          Login
        </Text>
      </Text>
    </View>
  );
}
