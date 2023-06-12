import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../../components/ChatComponents/MessageComponent';
import {styles} from '../../utils/styles';
import socket from '../../utils/socket';

interface Message {
  sender: string;
  message: string;
}

const Messaging = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages');
      const data = await response.json();

      if (response) {
        setMessages(data);
      } else {
        console.error('Error retrieving messages:', data);
      }
    } catch (error) {
      console.error('Error retrieving messages:', error);
    }
  };

  const handleNewMessage = () => {
    console.log('Sending message:', newMessage);

    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    const newMessageObj: Message = {
      sender: '??',
      message: newMessage,
    };

    setMessages(prevMessages => [...prevMessages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {messages[0] ? (
          <FlatList
            data={messages}
            renderItem={({item}) => (
              <MessageComponent item={item} user={user} />
            )}
            // keyExtractor={item => item.id}
            keyExtractor={(item: {id: any}) => item.id}
          />
        ) : (
          ''
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessages(value)}
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
