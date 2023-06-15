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
import {FormErrorState, FormState} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
const {width, height} = Dimensions.get('window');

const interests: string[] = [
  'Yoga',
  'Weightlifting',
  'Pilates',
  'Injury recover',
  'Aerobic',
  'Cardio',
  'Boxing',
  'Stretching',
];
interface SectionOneProps {
  next: () => void;
  back: () => void;
  formState: FormState;
  errorState: FormErrorState;
  onChangeHandler: (name: string, value: string | string[]) => void;
  inputHandler: (name: keyof FormState) => void;

}

export default function SectionTwo({
  next,
  back,
  formState,
  onChangeHandler,
  inputHandler,
  errorState,
}: SectionOneProps) {
  type ButtonProps = {
    onPress: () => void;
    isPressed: boolean;
    text: string;
    textStyle?: TextStyle;
    btnType: string;
  };
  const ToogleButton = ({
    onPress,
    isPressed,
    text,
    textStyle,
    btnType,
  }: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[
          btnType === 'level'
            ? [styles.levelBtn, isPressed && styles.levelBtnPressed]
            : [styles.interestBtn, isPressed && styles.interestBtnPressed],
        ]}
        onPress={onPress}>
        <Text
          style={[
            btnType === 'level'
              ? [
                  styles.levelBtnText,
                  textStyle,
                  isPressed && styles.levelBtnTextPressed,
                ]
              : [
                  styles.interestBtnText,
                  textStyle,
                  isPressed && styles.interestToogleBtnText,
                ],
          ]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };
  const Button = ({
    onPress,
    isPressed,
    text,
    textStyle,
    btnType,
  }: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[
          btnType === 'level'
            ? [styles.levelBtn, isPressed && styles.levelBtnPressed]
            : [styles.interestBtn, isPressed && styles.interestBtnPressed],
        ]}
        onPress={onPress}>
        <Text
          style={[
            btnType === 'level'
              ? [
                  styles.levelBtnText,
                  textStyle,
                  isPressed && styles.levelBtnTextPressed,
                ]
              : [
                  styles.interestBtnText,
                  textStyle,
                  isPressed && styles.interestToogleBtnText,
                ],
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

  // interest
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleInterestPress = (interest: string) => {
    const maxSelections = 5;
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else if (selectedInterests.length < maxSelections) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const isInterestPressed = (interest: string) => {
    return selectedInterests.includes(interest);
  };
  ////
  // check box
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <View
      style={{
        marginBottom: height * 0.13,
        marginTop: height * 0.05,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: height * 0.03,
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
        <ToogleButton
          onPress={() => {
            handleButtonPress('Newbie');
            onChangeHandler('gymLevel', 'Newbie');
          }}
          isPressed={isButtonPressed('Newbie')}
          text="Newbie"
          textStyle={{
            color: '#000',
          }}
          btnType="level"
        />
        <View style={{width: 15}} />

        <ToogleButton
          onPress={() => {
            handleButtonPress('Moderate');
            onChangeHandler('gymLevel', 'Moderate');
          }}
          isPressed={isButtonPressed('Moderate')}
          text="Moderate"
          textStyle={{
            color: '#000',
          }}
          btnType="level"
        />

        <ToogleButton
          onPress={() => {
            handleButtonPress('Vigorous');
            onChangeHandler('gymLevel', 'Vigorous');
          }}
          isPressed={isButtonPressed('Vigorous')}
          text="Vigorous"
          textStyle={{
            color: '#000',
          }}
          btnType="level"
        />
      </View>

      {errorState.gymLevel && <Text>Error: {errorState.gymLevel}</Text>}


      <Text style={[styles.title]}>Interests</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.75,
          flexWrap: 'wrap',
        }}>
        {/* {interests.map((interest, index) => (
          <Button
            key={index}
            onPress={() => handleButtonPress(interest)}
            isPressed={isButtonPressed(interest)}
            text={interest}
            textStyle={{color: '#000000'}}
            btnType="interest"
          />
        ))} */}
        {interests.map((interest, index) => (
          <Button
            key={index}
            onPress={() => {
              handleInterestPress(interest);
              onChangeHandler('interests', selectedInterests);
            }}
            isPressed={isInterestPressed(interest)}
            text={interest}
            textStyle={{color: '#F2B3B7'}}
            btnType="interest"
          />
        ))}
      </View>
      {errorState.interests && <Text>Error: {errorState.interests}</Text>}


      {/* remind */}
      <View>
        <Text
          style={{
            // textDecorationLine: 'underline',
            textAlign: 'center',
            width: width * 0.75,
            marginBottom: height * 0.02,
          }}>
          By continuing, you agree to Gymatess's Terms of service. We will
          manage information about you as described in our Privacy Policy, and
          Cookie Policy.
        </Text>
      </View>
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
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}
