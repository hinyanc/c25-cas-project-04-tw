import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../utils/styles';

const TargetWeight = () => {
  const [targetWeight, setTargetWeight] = useState('');
  const [showText, setShowText] = useState(false);

  const handleInputChange = (text: string) => {
    setTargetWeight(text);
  };

  const handleSubmit = () => {
    if (!targetWeight) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  };

  return (
    <View>
      <Text style={styles.targetWeight}>Your Target Weight:</Text>

      <View>
        <View style={{flexDirection: 'row'}}>
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
              height: 30,
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
        {showText && (
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              color: '#E2868D',
              marginTop: 8,
            }}>
            Still 10 kg to go! Fighting!
          </Text>
        )}
      </View>
    </View>
  );
};

export default TargetWeight;
