import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Card from '../components/TinderCard';
import users from '../assets/data/users';

import AnimatedStack from '../components/TinderAnimated';

const HomeDiscoverScreen = () => {
  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
});

export default HomeDiscoverScreen;