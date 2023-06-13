import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import Messaging from './src/screens/ChatScreens/Messaging';
import Chat from './src/screens/ChatScreens/Chat';
import BottomTabs from './src/components/BottomTab';
import LoginScreen from './src/screens/LoginScreens/LoginScreen';
import OnBoardingScreen from './src/screens/OnBoardScreen/onBoardScreen';
import HomeDiscoverScreen from './src/screens/HomeDiscoverScreen';
import LoginForm from './src/components/LoginComponents/login';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 30,
    fontWeight: '100',
    textAlign: 'center',
  },
});

//name of routes
export type StackParamList = {
  MyHome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Next: undefined;
  Chat: undefined;
  Messaging: {id: Number; name: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen
            name="Onboarding"
            component={OnBoardingScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginForm}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MyHome"
            component={BottomTabs}
            options={{title: 'Overview', headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{
              title: 'Chats',
              headerShown: false,
            }}
          />
          <Stack.Screen name="Messaging" component={Messaging} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <NavigationContainer>
        <BottomTabs />
      </NavigationContainer> */}
    </>
  );
}

{
  /* <Stack.Navigator initialRouteName="Home">

<Stack.Screen
  name="Home"
  component={HomeScreen}
  options={{title: 'Overview'}}
/>
<Stack.Screen name="Detail" component={DetailScreen} initialParams={{itemId:40}}/>

<Stack.Screen
  name="Chat"
  component={Chat}
  options={{
    title: 'Chats',
    headerShown: false,
  }}
/>
<Stack.Screen name="Messaging" component={Messaging} />
</Stack.Navigator> */
}
