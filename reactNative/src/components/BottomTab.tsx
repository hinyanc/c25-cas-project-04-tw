import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeDiscoverScreen from '../screens/HomeDiscoverScreen';
import WalletScreen from '../screens/WalletScreen';
import Chat from '../screens/ChatScreens/Chat';
import GoalScreen from '../screens/GoalScreen';
import UserScreen from '../screens/SelfScreens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Goal') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Self') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#E24E59',
        tabBarInactiveTintColor: '#707070',
      })}>
      <Tab.Screen name="Home" component={HomeDiscoverScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Goal" component={GoalScreen} />
      <Tab.Screen name="Self" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
