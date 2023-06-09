import React from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import users from '../assets/data/users';
import {TinderSwipe} from '../components/TinderSwipe';

const HomeDiscoverScreen = () => {
  return (
    <SafeAreaView>
      <TinderSwipe />
    </SafeAreaView>
  );
};

export default HomeDiscoverScreen;
