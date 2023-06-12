import React from 'react';
import {Text, View} from 'react-native';
import BMI from '../../components/GoalComponents/BMIComponent';
import TargetWeight from '../../components/GoalComponents/TargetWeightComponent';
import { styles } from '../../utils/styles';
import TargetGoals from '../../components/GoalComponents/TargetGoals';

const GoalScreen = () => {
  return (
    <View style={{ backgroundColor:'#FFF9F0'}}>
      <Text style={styles.setGoal}>Set Your Goal</Text>
      <BMI />
      <TargetWeight />
      <TargetGoals />
    </View>
  );
};

export default GoalScreen;
