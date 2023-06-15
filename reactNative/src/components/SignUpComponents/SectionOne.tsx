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
  // onChangeHandler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
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
  return (
    <View
      style={{
        marginBottom: height * 0.13,
      }}>
      <Text
        style={{
          textAlign: 'right',
          color: '#e24e59',
          fontWeight: 'bold',
        }}>
        STEP 1/4
      </Text>
      {/* title */}
      <Text style={[styles.title, {marginBottom: height * 0.05}]}>Signup</Text>
      {/* input */}
      <Text style={styles.inputTitle}>Username*</Text>
      <TextInput
        value={formState.username}
        onChangeText={text => onChangeHandler('username', text)}
        onBlur={e => inputHandler('username')}
        style={styles.input}
      />
      {errorState.username && <Text>Error: {errorState.username}</Text>}

      <Text style={styles.inputTitle}>Email address*</Text>
      <TextInput
        value={formState.email}
        onChangeText={text => onChangeHandler('email', text)}
        onBlur={e => inputHandler('email')}
        placeholder="Email"
        style={styles.input}
      />
      {errorState.email && <Text>Error: {errorState.email}</Text>}

      <Text style={styles.inputTitle}>Password*</Text>
      <TextInput
        secureTextEntry
        value={formState.password}
        onChangeText={text => onChangeHandler('password', text)}
        onBlur={e => inputHandler('password')}
        placeholder="Password"
        style={styles.input}
      />
      {errorState.password && <Text>Error: {errorState.password}</Text>}

      {/* remind */}
      <Text
        style={{
          // textDecorationLine: 'underline',
          textAlign: 'center',
          width: width * 0.75,
          marginBottom: height * 0.02,
        }}>
        Your name will be public and we'll send updates to the email address you
        provide.
      </Text>

      {/* ///continue button */}
      <TouchableOpacity
        onPress={e => {
          next();
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
          // textDecorationLine: 'underline',
          textAlign: 'center',
          width: width * 0.75,
          marginTop: 10,
        }}>
        Already have an account?
        <Text
          style={{
            // textDecorationLine: 'underline',
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
