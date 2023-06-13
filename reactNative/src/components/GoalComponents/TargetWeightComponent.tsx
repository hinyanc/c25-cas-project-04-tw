import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from '../../utils/styles';

const TargetWeight = () => {
  const [targetWeight, setTargetWeight] = useState('');
  return (
    <View>
      <Text style={styles.targetWeight}>Your Target Weight:</Text>
      <View>
        <View
          style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TextInput
            placeholder="set your target weight here.."
            placeholderTextColor="#B1B1B1"
            value={targetWeight}
            onChangeText={setTargetWeight}
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
          <Pressable style={[styles.weightBtn]} onPress={() => {}}>
            <Text style={styles.BMIChartText}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default TargetWeight;
