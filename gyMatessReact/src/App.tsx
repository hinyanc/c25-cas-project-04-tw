// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import React, {useState} from 'react';
// import {FlatList, StyleSheet, Text, View} from 'react-native';

// export default function App() {
//   const [todo, setTodos] = useState([
//     {text: 'buy cofee', key: '1'},
//     {text: 'buy milk', key: '2'},
//     {text: 'buy milk cofee', key: '3'},
//   ]);

//   return (
//     <View style={styles.container}>
//       {/* {header} */}
//       <View style={styles.content}>
//         {/* {to form} */}
//         <View style={styles.list}>
//           <FlatList
//             data={todo}
//             renderItem={({item}) => <Text>{item.text}</Text>}
//           />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   content: {
//     padding: 40,
//   },list:{
//     marginTop:20
//   }
// });

import React from 'react';
import {Provider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../src';
import {theme} from '../src/core/theme';

const Main = () => (
  <Provider theme={theme}>
    <NavigationContainer>
      <Login />
    </NavigationContainer>
  </Provider>
);

export default Main;
