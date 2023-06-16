import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {TinderSwipe} from '../components/HomeDiscoverComponents/TinderSwipe';
import {UserInfo} from '../components/HomeDiscoverComponents/UserInfo';

const HomeDiscoverScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF9F0'}}>
      <UserInfo />
      <TinderSwipe />
    </SafeAreaView>
  );
};

export default HomeDiscoverScreen;
