import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeDiscoverScreen from '../screens/HomeDiscoverScreen';
import WalletScreen from '../screens/WalletScreen';
import Chat from '../screens/ChatScreens/Chat';
import GoalScreen from '../screens/GoalScreen';
import UserScreen from '../screens/ProfileScreens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../utils/styles';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Wallet') {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === 'Chat') {
            iconName = focused
              ? 'chatbubble-ellipses'
              : 'chatbubble-ellipses-outline';
          } else if (route.name === 'Goal') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: '#E24E59',
        tabBarInactiveTintColor: '#707070',
        tabBarLabelStyle: {fontSize: 15, marginBottom: 20},
        tabBarIconStyle: {marginTop: 16},
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.tabShadow,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeDiscoverScreen}
      />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chats',
          headerShown: false,
        }}
      />
      <Tab.Screen name="Goal" component={GoalScreen} />
      <Tab.Screen name="Profile" component={UserScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
