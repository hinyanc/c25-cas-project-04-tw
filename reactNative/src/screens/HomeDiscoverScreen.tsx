import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {TinderSwipe} from '../components/HomeDiscoverComponents/TinderSwipe';
import {HomeUser} from '../components/HomeDiscoverComponents/UserInfo';
import {socket} from '../utils/socket';

const HomeDiscoverScreen = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF9F0'}}>
      <HomeUser />
      <TinderSwipe />
    </SafeAreaView>
  );
};

export default HomeDiscoverScreen;
