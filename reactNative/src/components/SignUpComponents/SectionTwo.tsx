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
import {
  FormErrorState,
  FormState,
} from '../../screens/SignUpScreen/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  const isButtonPressed = (button: string) => {
    return pressedButton === button;
  };
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  // date
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date());

  // height value weight value
  const [inputHeight, setInputHeight] = useState('');
  const [inputWeight, setInputWeight] = useState('');

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setChosenDate(selectedDate);
    }
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 12);

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
          STEP 2/5
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
      {errorState.gender !== null ? (
        <Text style={styles.errorMsg}>Error:{errorState.gender}</Text>
      ) : (
        <></>
      )}
      {/* {errorState.gender && <Text>Error: {errorState.gender}</Text>} */}

      <Text style={[styles.inputTitle, {marginTop: 10}]}>Date of birth</Text>

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
          onChange={e => {
            handleDateChange(chosenDate);
            onChangeHandler('birthday', chosenDate);
            console.log("hihi",chosenDate)
          }}
          // onChange={handleDateChange}
          maximumDate={maxDate}
        />
      )}
      <Text>Chosen Date: {chosenDate.toDateString()}</Text>
      {errorState.birthday !== null ? (
        <Text style={styles.errorMsg}>Error:{errorState.birthday}</Text>
      ) : (
        <></>
      )}


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
      {/* <TextInput
        keyboardType="numeric"
        value={inputHeight}
        onChangeText={text => onChangeHandler('height', text)}
        onBlur={e => parseInt(inputHeight)}
        placeholder="Height"
        style={styles.input}
      /> */}
      {errorState.height !== null ? (
        <Text style={styles.errorMsg}>Error:{errorState.height}</Text>
      ) : (
        <></>
      )}
      {/* {errorState.height && <Text>Error: {errorState.height}</Text>} */}

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
      {/* {errorState.weight && <Text>Error: {errorState.weight}</Text>} */}

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
          e.preventDefault;
          // not working
          inputHandler('gender');
          inputHandler('birthday');
          inputHandler('height');
          inputHandler('weight');
          if (
            errorState.gender === null &&
            errorState.birthday === null &&
            errorState.height === null &&
            errorState.weight === null
          ) {
            next();
          }
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
