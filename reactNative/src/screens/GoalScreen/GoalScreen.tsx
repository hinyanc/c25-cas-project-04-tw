import React from 'react';
import {Dimensions, ScrollView, Text, View} from 'react-native';
import BMI from '../../components/GoalComponents/BMIComponent';
import TargetWeight from '../../components/GoalComponents/TargetWeightComponent';
import {styles} from '../../utils/styles';
import TargetGoals from '../../components/GoalComponents/TargetGoals';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const GoalScreen = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: '#FFF9F0',
          width: ScreenWidth,
          height: ScreenHeight,padding: 10,
          position: 'relative',
        }}>
        <View style={styles.profileTopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.profileHeading}>Set your Goals</Text>
          </View>
        </View>
        <BMI />
        <TargetWeight />
        <TargetGoals />
      </View>
    </View>
  );
};

export default GoalScreen;
