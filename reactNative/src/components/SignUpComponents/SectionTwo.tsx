import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

import {styles} from '../../utils/signUpStyles';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {
  FormErrorState,
  FormState,
} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const {width, height} = Dimensions.get('window');

interface SectionTwoProps {
  next: () => void;
  back: () => void;
  errorState: FormErrorState;
  formState: FormState;
  onChangeHandler: (name: string, value: string | number | Date) => void;
  inputHandler: (name: keyof FormState) => void;
}

export default function SectionTwo({
  next,
  back,
  formState,
  onChangeHandler,
  errorState,
  inputHandler,
}: SectionTwoProps) {
  type ButtonProps = {
    onPress: () => void;
    isPressed?: boolean;
    text: string;
    textStyle?: TextStyle;
    btnType: string;
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
          btnType === 'gender'
            ? [styles.toogleBtn, isPressed && styles.toogleBtnPressed]
            : [styles.Continuebtn],
        ]}
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

  useEffect(() => {
    if (formState.gender) setPressedButton(formState.gender);
  }, []);

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
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

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  // date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());

  // height value weight value
  const [inputHeight, setInputHeight] = useState('');
  const [inputWeight, setInputWeight] = useState('');

  useEffect(() => {
    if (formState.height) setInputHeight(formState.height.toString());
  }, []);

  useEffect(() => {
    if (formState.weight) setInputWeight(formState.weight.toString());
  }, []);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setChosenDate(selectedDate);
      onChangeHandler('birthday', selectedDate);
    }
  };

  useEffect(() => {
    if (formState.birthday) setChosenDate(formState.birthday);
  }, []);

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);

  return (
    <View
      style={{
        marginBottom: height * 0.13,
        marginTop: height * 0.02,
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
          STEP 2/5
        </Text>
      </View>

      {/* input */}
      <Text
        style={[
          styles.inputTitle,
          {marginTop: height * 0.04, marginBottom: 5},
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
          onPress={() => {
            handleButtonPress('Male');
            onChangeHandler('gender', 'Male');
          }}
          isPressed={isButtonPressed('Male')}
          text="Male"
          textStyle={{
            color: '#F2B3B7',
          }}
          btnType="gender"
        />
        <View style={{width: 15}} />

        <Button
          onPress={() => {
            handleButtonPress('Female');
            onChangeHandler('gender', 'Female');
          }}
          isPressed={isButtonPressed('Female')}
          text="Female"
          textStyle={{
            color: '#F2B3B7',
          }}
          btnType="gender"
        />
      </View>
      <View style={{height: height * 0.02}}>
        {errorState.gender !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.gender}</Text>
        ) : (
          <></>
        )}
      </View>

      <Text style={[styles.inputTitle, {marginTop: 5}]}>Date of birth</Text>
      <View style={{height: height * 0.14}}>
        <Button
          onPress={() => setShowDatePicker(true)}
          text="Select Date"
          textStyle={{
            color: '#fff',
          }}
          btnType="date"
        />
        {showDatePicker && (
          <RNDateTimePicker
            testID="datePicker"
            value={chosenDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={maxDate}
          />
        )}
        <Text>Chosen Date: {chosenDate.toDateString()}</Text>
        {errorState.birthday !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.birthday}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={{height: height * 0.17}}>
        <Text style={styles.inputTitle}>Height* (cm)</Text>
        <TextInput
          keyboardType="numeric"
          value={inputHeight}
          onChangeText={text => {
            setInputHeight(text);
            onChangeHandler('height', parseInt(text));
          }}
          onBlur={e => inputHandler('height')}
          placeholder="Height"
          style={styles.input}
        />

        {errorState.height !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.height}</Text>
        ) : (
          <></>
        )}
      </View>

      <View style={{height: height * 0.18}}>
        <Text style={styles.inputTitle}>Weight* (kg)</Text>
        <TextInput
          keyboardType="numeric"
          value={inputWeight}
          onChangeText={text => {
            setInputWeight(text);
            onChangeHandler('weight', parseInt(text));
          }}
          onBlur={e => inputHandler('weight')}
          placeholder="Weight"
          style={styles.input}
        />
        {errorState.weight !== null ? (
          <Text style={styles.errorMsg}>Error:{errorState.weight}</Text>
        ) : (
          <></>
        )}
      </View>

      {/* remind */}
      <Text
        style={{
          textAlign: 'center',
          width: width * 0.75,
        }}>
        Age and gender help improve recommendations
      </Text>

      {/* ///continue button */}
      <TouchableOpacity
        disabled={isButtonDisabled}
        onPress={e => {
          e.preventDefault;
          handleButtonClick;

          inputHandler('gender');
          inputHandler('birthday');
          inputHandler('height');
          inputHandler('weight');
          setTimeout(() => {
            if (
              errorState.gender === null &&
              errorState.birthday === null &&
              errorState.height === null &&
              errorState.weight === null
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
    </View>
  );
}
