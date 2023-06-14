import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../utils/styles';
import PlansTable from '../components/PlanComponents/PlanTable';
import PlanButton from '../components/PlanComponents/PlanButton';

const PlanScreen = () => {
  return (
    <ScrollView>
    <View style={{flex: 1, alignItems: 'center', backgroundColor:'#FFF9F0'}}>
      <Text style={styles.subPlan}>Subscription Plans</Text>
      <Text style={styles.subDetails}>Upgrade to Diamond</Text>
      <Text style={styles.subDetails}>
        for an enhanced GyMatess experience.
      </Text>
      <PlansTable />
      <PlanButton />
    </View></ScrollView>
  );
};

export default PlanScreen;
