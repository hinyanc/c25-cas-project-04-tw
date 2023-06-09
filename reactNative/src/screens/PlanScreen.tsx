import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../utils/styles';
import PlansTable from '../components/PlanComponents/PlanTable';
import PlanButton from '../components/PlanComponents/PlanButton';

const PlanScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Text style={styles.subPlan}>Subscription Plans</Text>
      <Text style={styles.subDetails}>Upgrade to Diamond</Text>
      <Text style={styles.subDetails}>
        for an enhanced GyMatess experience.
      </Text>
      <PlansTable />
      <PlanButton />
    </View>
  );
};

export default PlanScreen;
