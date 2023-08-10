import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

import {styles} from '../../utils/signUpStyles';

import {
  FormErrorState,
  FormState,
} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
interface SectionFourProps {
  next: () => void;
  back: () => void;
  formState: FormState;
  errorState: FormErrorState;
  onChangeHandler: (name: string, value: string | string[]) => void;
  inputHandler: (name: keyof FormState) => void;
}

export default function SectionFour({
  next,
  back,
  formState,
  onChangeHandler,
  inputHandler,
  errorState,
}: SectionFourProps) {
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
    return formState.gymLevel === button;
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

  useEffect(() => {
    if (formState.interests) setSelectedInterests(formState.interests);
  }, []);

  useEffect(() => {
    onChangeHandler('interests', selectedInterests);
  }, [selectedInterests]);

  const isInterestPressed = (interest: string) => {
    return selectedInterests.includes(interest);
  };

  // continue button only click once
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    // Disable the button after a single click
    setButtonDisabled(true);

    // Perform your desired action here

    //delay 1 seconds before re-enabling the button
    setTimeout(() => {
      setButtonDisabled(false);
    }, 1001);
  };

  return (
    <View
      style={{
        marginBottom: height * 0.13,
        marginTop: height * 0.01,
      }}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: height * 0.02,
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
          STEP 4/5
        </Text>
      </View>

      <Text style={[styles.title]}>My Gym Level</Text>
      <View
        style={{
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
            color: '#e24e59',
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
            color: '#e24e59',
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
            color: '#e24e59',
          }}
          btnType="level"
        />
      </View>
      <View style={{height: height * 0.04}}>
        {errorState.gymLevel !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.gymLevel}</Text>
        ) : (
          <></>
        )}
      </View>

      <Text style={[styles.title]}>Interests</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: width * 0.75,
          flexWrap: 'wrap',
        }}>

        {interests.map((interest, index) => (
          <Button
            key={index}
            onPress={() => {
              handleInterestPress(interest);
              // onChangeHandler('interests', selectedInterests);
            }}
            isPressed={isInterestPressed(interest)}
            text={interest}
            textStyle={{color: '#F2B3B7'}}
            btnType="interest"
          />
        ))}
      </View>
      <View style={{height: height * 0.07}}>
        {errorState.interests !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.interests}</Text>
        ) : (
          <></>
        )}
      </View>

      <TouchableOpacity
        onPress={e => {
          e.preventDefault;
          handleButtonClick;
// not string
          inputHandler('gymLevel');
          inputHandler('interests');

          setTimeout(() => {
            if (errorState.gymLevel === null && errorState.interests === null) {
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
    </View>
  );
}
