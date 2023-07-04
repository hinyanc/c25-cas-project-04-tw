import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {styles} from '../utils/styles';
import PlansTable from '../components/PlanComponents/PlanTable';
import PlanButton from '../components/PlanComponents/PlanButton';
import PlansPrice from '../components/PlanComponents/PlanPrice';

const PlanScreen = () => {
  return (
    <ScrollView>
      <View style={{flex: 1, alignItems: 'center', backgroundColor: '#FFF9F0',padding: 10,
    position: 'relative',}}>
        <View style={styles.profileTopContainer}>
          <View style={styles.chatheader}>
            <Text style={styles.profileHeading}>Subscription Plans</Text>
          </View>
        </View>
        <Text style={styles.subDetails}>Upgrade to Diamond</Text>
        <Text style={styles.subDetails}>
          for an enhanced GyMatess experience.
        </Text>
        <PlansTable />
        <PlansPrice />
        <PlanButton />
      </View>
    </ScrollView>
  );
};

export default PlanScreen;
