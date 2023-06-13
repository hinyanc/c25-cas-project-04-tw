import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../../components/ChatComponents/MessageComponent';
import {styles} from '../../utils/styles';
// import socket from '../../utils/socket';

const Messaging = ({route, navigation}: any) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      text: 'Hello Julia, React Native is very easy!',
      time: '07:50',
      user: 'Chinny',
    },
    {
      id: '2',
      text: 'Hi Julia, I like React Native! 😇',
      time: '08:50',
      user: 'Yannes',
    },
  ]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  // Access the chatroom's name and id
  const {name, id} = route.params;

  // This function gets the username saved on AsyncStorage
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  // Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({title: name});
    getUsername();
  }, []);

  /*
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */
  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    console.log({
      message,
      user,
      timestamp: {hour, mins},
    });
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages[0] ? (
          <FlatList
            data={chatMessages}
            renderItem={({item}) => (
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;

//keep!
// useEffect(() => {
//   fetchMessages();
// }, []);

// const fetchMessages = async () => {
//   try {
//     const response = await fetch('http://localhost:8080/messages');
//     const data = await response.json();

//     if (response) {
//       setMessages(data);
//     } else {
//       console.error('Error retrieving messages:', data);
//     }
//   } catch (error) {
//     console.error('Error retrieving messages:', error);
//   }
// };

// const handleNewMessage = () => {
//   console.log('Sending message:', newMessage);

//   const hour =
//     new Date().getHours() < 10
//       ? `0${new Date().getHours()}`
//       : `${new Date().getHours()}`;

//   const mins =
//     new Date().getMinutes() < 10
//       ? `0${new Date().getMinutes()}`
//       : `${new Date().getMinutes()}`;

//   const newMessageObj: Message = {
//     sender: '??',
//     message: newMessage,
//   };

//   setMessages(prevMessages => [...prevMessages, newMessageObj]);
//   setNewMessage('');
// };
