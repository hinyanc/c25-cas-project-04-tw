import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import {styles} from '../../utils/styles';

export function Filtering() {
  type ButtonProps = {
    onPress: () => void;
    isPressed: boolean;
    text: string;
    textStyle?: TextStyle;
  };

  const Button = ({onPress, isPressed, text, textStyle}: ButtonProps) => {
    return (
      <TouchableOpacity
        style={[styles.FilteringBtn, isPressed && styles.FilteringBtnPressed]}
        onPress={onPress}>
        <Text
          style={[
            styles.FilteringBtnText,
            textStyle,
            isPressed && styles.FilteringBtnText,
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

  return (
    <ScrollView style={{backgroundColor: '#FFF9F0'}}>
      <View
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.discoverTitle}>Discover</Text>
        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginLeft: 20,
            marginRight: 20,
          }}>
          <Button
            onPress={() => handleButtonPress('All Users')}
            isPressed={isButtonPressed('All Users')}
            text="All Users"
            textStyle={{color: '#F2B3B7'}}
          />
          <Button
            onPress={() => handleButtonPress('GyMates')}
            isPressed={isButtonPressed('GyMates')}
            text="GyMates"
            textStyle={{color: '#F2B3B7'}}
          />
          <Button
            onPress={() => handleButtonPress('PTs')}
            isPressed={isButtonPressed('PTs')}
            text="PTs"
            textStyle={{color: '#F2B3B7'}}
          />
        </View>
      </View>
    </ScrollView>
  );
}
