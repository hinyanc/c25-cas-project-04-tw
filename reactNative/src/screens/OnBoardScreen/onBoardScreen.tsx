import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';
import { StackParamList } from '../../../App';
import {StackScreenProps} from '@react-navigation/stack';
import Onboarding from 'react-native-onboarding-swiper';


type OnBoardingScreenProps = StackScreenProps<StackParamList, 'Onboarding'>;

const OnBoardingScreen = ({navigation}:OnBoardingScreenProps) => {
  return (
    // <View style={styles.container}>
    //   <Text>Onboarding Screen</Text>
    //   <Button title="Click here" onPress={() => navigation.navigate('Login')} />
    // </View>
    <Onboarding
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../../assets/onBoardImg/onboard-1.png')} />,
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../../assets/onBoardImg/onboard-2.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fff',
        image: <Image source={require('../../assets/onBoardImg/onboard-3.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },

  ]}
/>
  );
};

export default OnBoardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
