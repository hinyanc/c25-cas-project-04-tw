import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeDiscoverScreen from '../screens/HomeDiscoverScreen';
import Chat from '../screens/ChatScreens/Chat';
import GoalScreen from '../screens/GoalScreen/GoalScreen';
import UserScreen from '../screens/ProfileScreens/UserScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../utils/styles';
import PlanScreen from '../screens/PlanScreen';

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
          } else if (route.name === 'Plan') {
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
          // position: 'absolute',
          // bottom: 10,
          // left: 10,
          // right: 10,
          // elevation: 0,
          backgroundColor: '#ffffff',
          // borderRadius: 15,
          height: 90,
          // ...styles.tabShadow,
        },
      })}>
      <Tab.Screen
        name="Goal"
        component={GoalScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Plan"
        component={PlanScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Home"
        component={HomeDiscoverScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: 'Chats',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
