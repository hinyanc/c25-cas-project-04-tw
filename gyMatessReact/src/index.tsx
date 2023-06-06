// import {createAppContainer}  from '@react-navigation/native';
// import { createStackNavigator } from 'react-navigation-stack';

// import {
//   HomeScreen,
//   LoginScreen,
//   RegisterScreen,
//   Dashboard,
// } from './screens';

// const Router = createStackNavigator(
//   {
//     HomeScreen,
//     LoginScreen,
//     RegisterScreen,
//     Dashboard,
//   },
//   {
//     initialRouteName: 'HomeScreen',
//     headerMode: 'none',
//   }
// );

// export default createAppContainer(Router);

import * as React from 'react';
// import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, LoginScreen, RegisterScreen, Dashboard} from './screens';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const LoginStack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <LoginStack.Navigator initialRouteName="HomeScreen" >
        <LoginStack.Screen name="Home" component={HomeScreen} />
        <LoginStack.Screen name="Login" component={LoginScreen} />
        <LoginStack.Screen name="Register" component={RegisterScreen} />
        <LoginStack.Screen name="Dashboard" component={Dashboard} />
      </LoginStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
