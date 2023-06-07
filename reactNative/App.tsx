// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import Cover from './src/screens/Cover';
import Messaging from './src/screens/Messaging';
import Chat from './src/screens/Chat';

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
type StackParamList = {
  Home: undefined;
  Detail: undefined;
  Next: undefined;
  Cover: undefined;
  Chat: undefined;
  Messaging: undefined;
};

//name of routes = name props = StackParamList[Home]
type HomeScreenProps = StackScreenProps<StackParamList, 'Home'>;
type DetailScreenProps = StackScreenProps<StackParamList, 'Detail'>;
type NextScreenProps = StackScreenProps<StackParamList, 'Next'>;

function HomeScreen({navigation}: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate('Detail');
        }}
      />
    </View>
  );
}
function DetailScreen({navigation}: DetailScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Details Screen</Text>
      <Button
        title="Go to Details again.."
        onPress={() => {
          // add new route to the navigation stack
          navigation.push('Detail');
        }}
      />
    </View>
  );
}
function NextScreen({navigation}: NextScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Next Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* options change the header of the screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview'}}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen
          name="Cover"
          component={Cover}
          options={{headerShown: false}}
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
        <Stack.Screen
          name="Next"
          component={NextScreen}
          options={({navigation}) => ({
            title: 'Awesome app',
            headerLeft: () => (
              <Button  title="to home"onPress={() => navigation.navigate("Home")} />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
