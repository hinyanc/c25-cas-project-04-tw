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
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');

const interests: string[] = [
  "Yoga",
  "Weightlifting",
  "Pilates",
  "Injury recover",
  "Aerobic",
  "Cardio",
  "Boxing",
  "Stretching",
];
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
        style={[styles.levelBtn, isPressed && styles.levelBtnPressed]}
        onPress={onPress}>
        <Text
          style={[
            styles.levelBtnText,
            textStyle,
            isPressed && styles.levelBtnTextPressed,
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
          STEP 4/4
        </Text>
      </View>

      <Text style={[styles.title]}>My Gym Level</Text>
      <View
        style={{
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.75,
          height: height * 0.23,
        }}>
        <Button
          onPress={() => handleButtonPress('Newbie')}
          isPressed={isButtonPressed('Newbie')}
          text="Newbie"
          textStyle={{
            color: '#000000',
          }}
        />
        <View style={{width: 15}} />

        <Button
          onPress={() => handleButtonPress('Moderate')}
          isPressed={isButtonPressed('Moderate')}
          text="Moderate"
          textStyle={{
            color: '#000000',
          }}
        />

        <Button
          onPress={() => handleButtonPress('Vigorous')}
          isPressed={isButtonPressed('Vigorous')}
          text="Vigorous"
          textStyle={{
            color: '#000000',
          }}
        />
      </View>
      <Text style={[styles.title]}>Interests</Text>

      <TextInput
        keyboardType="numeric"
        value={formState.height}
        onChangeText={text => onChangeHandler('height', text)}
        placeholder="Height"
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
          Submit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
