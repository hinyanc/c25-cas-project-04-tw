import React, {useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TargetGoals = () => {
  return (
    <View>
      <View style={{marginTop: 100}}>
        <Text style={styles.setGoal}>Target Goals  <Ionicons name='add-circle-sharp' size={35} color={'#E24E59'} onPress={()=>{}}/></Text>
        
      </View>
    </View>
  );
};

export default TargetGoals;
