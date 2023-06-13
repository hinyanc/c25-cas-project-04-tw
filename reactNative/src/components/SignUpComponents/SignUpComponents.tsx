// import React, {useState} from 'react';
// import {
//   Dimensions,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export type InputType = {
//   username: string;
//   email: string;
//   password: string;
//   gender: string;
//   birthday: string;
//   height: number;
//   weight: number;
//   isMember: boolean;
//   gymCenter: string;
//   locaiton: string;
//   bio: string;
//   gymLevel: string;
//   interests: string[];
// };

// type InputProps = {
//   input: InputType;
//   onPage:()=>void
// };

// const {width, height} = Dimensions.get('window');

// export default function (props: InputProps) {
//   const [count, setCount] = useState(1);

//   const onContinue = () => {
//     setCount(count + 1);
//   };

//   const onBack = () => {
//     setCount(count - 1);
//   };

//   return (
//     <>
//       {
//         <SafeAreaView
//           style={{
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: height,
//           }}>
//           <ScrollView>
//             <View
//               style={{
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: height,
//               }}>
//               <Text style={styles.title}>Signup</Text>
//               <Text
//                 style={styles.inputTitle}>
//                 Username*
//               </Text>
//               <TextInput
//                 placeholder="Username"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.input}
//                 // keyboardType="email-address"
//               />
//               {/* {errors.email ? (
//                     <Text style={styles.errorMsg}>{errors.email}</Text>
//                   ) : (
//                     <></>
//                   )} */}
//               <Text
//                 style={styles.inputTitle}>
//                 Email address*
//               </Text>
//               <TextInput
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 style={styles.input}
//                 // keyboardType="email-address"
//               />
//               <Text
//                 style={styles.inputTitle}>
//                 Password*
//               </Text>
//               <TextInput
//                 placeholder="Password"
//                 secureTextEntry
//                 value={password}
//                 onChangeText={setPassword}
//                 style={[styles.input, errors.password ? styles.error : {}]}
//               />
//               {errors.password ? (
//                 <Text style={styles.errorMsg}>{errors.password}</Text>
//               ) : (
//                 <></>
//               )}
//               <TouchableOpacity onPress={onContinue} style={styles.Continuebtn}>
//                 <Text
//                   style={{
//                     textAlign: 'center',
//                     paddingVertical: 10,
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                     color: '#fff',
//                   }}>
//                   Login
//                 </Text>
//               </TouchableOpacity>
//               <Text>
//                 Still don't have an account?
//                 <Text
//                   style={{
//                     // textDecorationLine: 'underline',
//                     fontWeight: 'bold',
//                     fontSize: 20,
//                   }}
//                   onPress={() => {
//                     navigation.navigate('MyHome');
//                     // sign up
//                   }}>
//                   Sign Up
//                 </Text>
//               </Text>
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       }
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginTop: 20,
//     textAlign: 'left',
//     marginVertical: 10,
//     alignSelf: 'flex-start',
//   },
//   btn: {
//     width: width * 0.75,
//     height: height * 0.07,
//     backgroundColor: 'rgba(4, 59, 92, 0.7)',
//     marginHorizontal: 4,
//     marginVertical: 10,
//     borderRadius: 16,
//     opacity: 0.1,
//   },
//   input: {
//     width: width * 0.75,
//     height: height * 0.07,
//     marginHorizontal: 4,
//     marginVertical: 10,
//     borderWidth: 2,
//     borderRadius: 16,
//     color: 'black',
//     borderColor: 'rgba(255, 94, 135, 0.17)',
//     textAlign: 'center',
//   },
//   Continuebtn: {
//     width: width * 0.75,
//     height: height * 0.07,
//     marginHorizontal: 4,
//     marginVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent'
//   },
//   errorMsg: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   error: {
//     borderColor: 'red',
//     borderWidth: 1,
//   },inputTitle:{
//     textAlign: 'left',
//     alignSelf: 'flex-start',
//   }
// });

// ///set count default 1  show page 1  ,click continue count+1 show page2 , click back count -1 show page page1
// //on change set value
// //click continue or on blur validate ok then next page \
