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
import {FormState} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

interface SectionOneProps {
  next: () => void;
  back: () => void;
  formState: FormState;
  onChangeHandler: (name: string, value: string) => void;
}

export default function SectionTwo({
  next,
  back,
  formState,
  onChangeHandler,
}: SectionOneProps) {
  type ButtonProps = {
    onPress: () => void;
    isPressed: boolean;
    text: string;
    textStyle?: TextStyle;
  };
  const Button = ({onPress, isPressed, text, textStyle}: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[styles.toogleBtn, isPressed && styles.toogleBtnPressed]}
        onPress={onPress}>
        <Text
          style={[
            styles.toogleBtnText,
            textStyle,
            isPressed && styles.pressedToogleBtnBtnText,
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleButtonPress = (button: string) => {
    setPressedButton(button);
  };

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
  };
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
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
          STEP 2/4
        </Text>
      </View>

      {/* input */}
      <Text
        style={[
          styles.inputTitle,
          {marginTop: height * 0.04, marginBottom: 10},
        ]}>
        Gender*
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => handleButtonPress('Male')}
          isPressed={isButtonPressed('Male')}
          text="Male"
          textStyle={{
            color: '#F2B3B7',
          }}
        />
        <View style={{width: 15}} />

        <Button
          onPress={() => handleButtonPress('Female')}
          isPressed={isButtonPressed('Female')}
          text="Female"
          textStyle={{
            color: '#F2B3B7',
          }}
        />
      </View>
      {/* <TextInput
        value={formState.gender}
        onChange={onChangeHandler}
        placeholder="UserName"
        style={styles.input}
      /> */}
      <Text style={[styles.inputTitle, {marginTop: 10}]}>Date of birth</Text>
      <TextInput
        value={formState.birthday}
        onChangeText={text => onChangeHandler('birthday', text)}
        placeholder="Email"
        style={styles.input}
      />
      <Text style={styles.inputTitle}>Height*</Text>
      <TextInput
        keyboardType="numeric"
        value={formState.height}
        onChangeText={text => onChangeHandler('height', text)}
        placeholder="Height"
        style={styles.input}
      />
      <Text style={styles.inputTitle}>Weight*</Text>
      <TextInput
        value={formState.weight}
        onChangeText={text => onChangeHandler('weight', text)}
        placeholder="Weight"
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
