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
import LoginForm from './src/screens/LoginScreens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import SignUpForm from './src/screens/SignUpScreen/SignUpScreen';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {Provider, useSelector} from 'react-redux';
import {store} from './src/store/store';
import {LogBox} from 'react-native';
// import socket from './src/utils/socket';
import {ConnectionState} from './src/utils/ConnectionStates';
import {Events} from './src/utils/Event';
import PlanScreen from './src/screens/PlanScreen';
// import UploadFile from './src/screens/SignUpScreen/UploadFile';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message'])
LogBox.ignoreAllLogs();

// import {LoginForm} from "./src/components/LoginComponents/login"
export const queryClient = new QueryClient();

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
  SignUp: undefined;
  MyHome: undefined;
  Onboarding: undefined;
  Login: undefined;
  Next: undefined;
  Chat: undefined;
  Plan: undefined;
  // uploadFile:undefined;
  Messaging: {target_user_id: Number; target_username: string};
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  // const isAuth = useSelector((state:IRootState)=>state.auth.isAuthenticated)
  const [isFirstLaunch, setFirstLaunch] = useState(false);
  const [serverMessage, setServerMessage] = useState<string[]>([]);

  useEffect(() => {
    const getOnboardingFlag = async () => {
      const flag = await AsyncStorage.getItem('hasCompletedOnboarding');
      setFirstLaunch(flag === 'true');
    };
    getOnboardingFlag();
  }, []);

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Onboarding">
              {/* {isFirstLaunch ? (
            <>
              
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
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginForm}
              options={{
                headerShown: false,
              }}
            />
          )} */}

              <Stack.Screen
                name="Onboarding"
                component={OnBoardingScreen}
                options={{
                  headerShown: false,
                }}
              />
              {/* <Stack.Screen
                name="uploadFile"
                component={UploadFile}
                options={{
                  headerShown: false,
                }}
              /> */}
              <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpForm}
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
              <Stack.Screen name="Plan" component={PlanScreen} options={{
                  headerShown: false,
                }} />
            </Stack.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </Provider>
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
