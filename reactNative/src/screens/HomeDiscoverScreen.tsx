import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {TinderSwipe} from '../components/HomeDiscoverComponents/TinderSwipe';
import {UserInfo} from '../components/HomeDiscoverComponents/UserInfo';
import {Filtering} from '../components/HomeDiscoverComponents/Filtering';

const HomeDiscoverScreen = () => {
  return (
    <SafeAreaView>
        <UserInfo />
        <Filtering />
        <TinderSwipe />
    </SafeAreaView>
  );
};

export default HomeDiscoverScreen;
