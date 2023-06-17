import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {TinderSwipe} from '../components/HomeDiscoverComponents/TinderSwipe';
import {HomeUser} from '../components/HomeDiscoverComponents/UserInfo';

const HomeDiscoverScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF9F0'}}>
      <HomeUser />
      <TinderSwipe />
    </SafeAreaView>
  );
};

export default HomeDiscoverScreen;
