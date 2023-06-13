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
import {FormState} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

interface SectionOneProps {
  next: () => void;
  back: () => void;
  formState: FormState;
  onChangeHandler: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

export default function SectionTwo({
  next,
  back,
  formState,
  onChangeHandler,
}: SectionOneProps) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View
      style={{
        marginBottom: height * 0.13,
      }}>
      <View>
        <TouchableOpacity
          onPress={e => {
            back();
          }}>
          <Ionicons name="arrow-back"></Ionicons>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'right',
            color: '#e24e59',
            fontWeight: 'bold',
          }}>
          STEP 2/4
        </Text>
      </View>

      {/* input */}
      <Text style={styles.inputTitle}>Gender*</Text>
      <View style={{
            flexDirection: 'row'
          }}>
      <TouchableOpacity
        onPress={e => {
          next();
        }}
        style={styles. tooglebtn}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Male
        </Text>
      </TouchableOpacity>
      <View style={{width: 15}} />
      <TouchableOpacity
        onPress={e => {
          next();
        }}
        style={styles. tooglebtn}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: 10,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          }}>
          Female
        </Text>
      </TouchableOpacity>
      </View>
      {/* <TextInput
        value={formState.gender}
        onChange={onChangeHandler}
        placeholder="UserName"
        style={styles.input}
      /> */}
      <Text style={styles.inputTitle}>Date of birth</Text>
      <TextInput
        value={formState.birthday}
        onChange={onChangeHandler}
        placeholder="Email"
        style={styles.input}
      />
      <Text style={styles.inputTitle}>Height*</Text>
      <TextInput
        value={formState.height}
        onChange={onChangeHandler}
        placeholder="Password"
        style={styles.input}
      />
      {/* remind */}
      <Text
        style={{
          // textDecorationLine: 'underline',
          textAlign: 'center',
          width: width * 0.75,
          marginBottom: height * 0.02,
        }}>
        Age and gender help improve recommendations
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
