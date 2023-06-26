import React, {useEffect, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetBMI} from '../../hooks/goalAPI';
import { REACT_APP_API_SERVER } from '@env';

const TargetWeight = () => {
  const [targetWeight, setTargetWeight] = useState('');
  const [showText, setShowText] = useState(false);
  const [token, setToken] = useState('');

  const getLocalStorage = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token == null) {
    } else {
      setToken(token!);
    }
  };
  useEffect(() => {
    getLocalStorage();
  });

  const handleInputChange = (text: string) => {
    setTargetWeight(text);
  };
  let fetchData = useGetBMI(token);
  const weight = Object.values(fetchData)[0];
  const handleSubmit = async () => {
    setShowText(true);
    await fetch(
      `${REACT_APP_API_SERVER}/goal/set-target-weight`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          targetWeight: targetWeight,
        }),
      },
    );
  };

  return (
    <View>
      <Text style={styles.targetWeight}>Your Target Weight (kg) :</Text>

      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TextInput
            placeholder="Set your target weight here"
            maxLength={3}
            placeholderTextColor="#B1B1B1"
            value={targetWeight}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            style={{
              padding: 0,
              fontSize: 13,
              paddingLeft: 10,
              width: 200,
              height: 40,
              backgroundColor: 'white',
              marginLeft: 25,
              borderWidth: 1,
              borderRadius: 16,
              borderColor: '#E2868D',
              color: '#B1B1B1',
            }}
          />
          <TouchableOpacity style={[styles.weightBtn]} onPress={handleSubmit}>
            <Text style={styles.BMIChartText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        {targetWeight ? (
          showText && (
            <View>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#E2868D',
                marginTop: 8,
              }}>
              Your weight: {weight} kg
            </Text>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'center',
                color: '#E2868D',
                marginTop: 8,
              }}>
              Your target weight: {targetWeight} kg
            </Text>
            <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#E2868D',
              marginTop: 8,
            }}>
            Still {weight - parseInt(targetWeight)} kg to go! Fighting!
          </Text>
          </View>
          )
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default TargetWeight;
