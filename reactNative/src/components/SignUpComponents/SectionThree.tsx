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
import {Picker} from '@react-native-picker/picker';

const {width, height} = Dimensions.get('window');

const gymCenter = [
  '24/7 Fitness',
  'Pure Fitness',
  'Go24',
  'Physical',
  'Fitness First',
  'Anytime Fitness',
  'Snap Fitness',
  'Leisure and Cultural Services Department (LCSD)',
];

const gymLocations: string[] = [
  'Central and Western',
  'Eastern',
  'Southern',
  'Wan Chai',
  'Kowloon City',
  'Kwun Tong',
  'Sham Shui Po',
  'Wong Tai Sin',
  'Yau Tsim Mong',
  'Islands',
  'Kwai Tsing',
  'North',
  'Sai Kung',
  'Sha Tin',
  'Tai Po',
  'Tsuen Wan',
  'Tuen Mun',
  'Yuen Long',
];

interface SectionThreeProps {
  next: () => void;
  back: () => void;
  formState: FormState;
  errorState: FormErrorState;
  onChangeHandler: (name: string, value: string | boolean | number) => void;
  inputHandler: (name: keyof FormState) => void;
}

export default function SectionThree({
  next,
  back,
  formState,
  onChangeHandler,
  inputHandler,
  errorState,
}: SectionThreeProps) {
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
  const [selectedCenter, setSelectedCenter] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
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
          STEP 3/5
        </Text>
      </View>

      {/* input */}
      <Text
        style={[
          styles.inputTitle,
          {marginTop: height * 0.04, marginBottom: 10},
        ]}>
        Any gym center membership?
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          onPress={() => {
            handleButtonPress('Yes');
            onChangeHandler('isMember', true);
          }}
          isPressed={isButtonPressed('Yes')}
          text="Yes"
          textStyle={{
            color: '#F2B3B7',
          }}
        />
        <View style={{width: 15}} />

        <Button
          onPress={() => {
            handleButtonPress('No');
            onChangeHandler('isMember', false);
          }}
          isPressed={isButtonPressed('No')}
          text="No"
          textStyle={{
            color: '#F2B3B7',
          }}
        />
      </View>
      {errorState.isMember !== null ? (
        <Text style={styles.errorMsg}>Error:{errorState.isMember}</Text>
      ) : (
        <></>
      )}

      <Text style={[styles.inputTitle, {marginTop: 10}]}>
        Choose your gym center
      </Text>
      <View style={styles.input}>
        <Picker
          selectedValue={selectedCenter}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedCenter(itemValue);
            onChangeHandler('gymCenter', itemIndex);
            console.log(itemIndex);
          }}>
          <Picker.Item label="Gym center" value={null} />
          {gymCenter.map((center, index) => (
            <Picker.Item key={index} label={center} value={center} />
          ))}
        </Picker>
      </View>

      <Text style={styles.inputTitle}>Choose your gym center location</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={selectedLocation}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLocation(itemValue);
            onChangeHandler('locaiton', itemIndex);
          }}>
          <Picker.Item label="Gym location" value={null} />
          {gymLocations.map((location, index) => (
            <Picker.Item key={index} label={location} value={location} />
          ))}
        </Picker>

        
      </View>
      <Text style={styles.inputTitle}>Bio</Text>
      <TextInput
        multiline={true}
        numberOfLines={4}
        onChangeText={text => onChangeHandler('bio', text)}
        value={formState.bio}
        placeholder="Type something about yourself..."
        style={styles.bioInput}
      />

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
    </View>
  );
}
