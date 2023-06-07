// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import {styles} from '../utils/styles';
// import React, {useEffect} from 'react';
// import socket from 'socket.io-client';
// import io from 'socket.io-client';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const socket = io('http://localhost:3000');

//   useEffect(() => {
//     socket.on('update user list', data => {
//       setUsers(data.users);
//     });
//   }, []);

//   return (
//     <View>
//       <Text>Online Users:</Text>
//       {users.map(user => (
//         <Text key={user.id}>{user.username}</Text>
//       ))}
//     </View>
//   );
// };

const ChatComponent = ({item}) => {
  // const navigation = useNavigation();
  // const [messages, setMessages] = useState({});

  // //👇🏻 Retrieves the last message in the array from the item prop
  // useLayoutEffect(() => {
  //   setMessages(item.messages[item.messages.length - 1]);
  // }, []);

  // ///👇🏻 Navigates to the Messaging screen
  // const handleNavigation = () => {
  //   navigation.navigate('Messaging', {
  //     id: item.id,
  //     name: item.name,
  //   });
  // };

  // return (
  //   <Pressable style={styles.cchat} onPress={handleNavigation}>
  //     <Ionicons
  //       name="person-circle-outline"
  //       size={45}
  //       color="black"
  //       style={styles.cavatar}
  //     />

  //     <View style={styles.crightContainer}>
  //       <View>
  //         <Text style={styles.cusername}>{item.name}</Text>

  //         <Text style={styles.cmessage}>
  //           {messages?.text ? messages.text : 'Tap to start chatting'}
  //         </Text>
  //       </View>
  //       <View>
  //         <Text style={styles.ctime}>
  //           {messages?.time ? messages.time : 'now'}
  //         </Text>
  //       </View>
  //     </View>
  //   </Pressable>
  // );
};

export default ChatComponent;
