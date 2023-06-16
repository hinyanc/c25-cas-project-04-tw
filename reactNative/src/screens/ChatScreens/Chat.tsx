import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import {styles} from '../../utils/styles';
import {useChatList} from '../../hooks/chatAPI';
import socket from '../../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const [mainUser, setMainUser] = useState('');
  const [token, setToken] = useState('');
  const [tempChats, setTempChats] = useState<any[]>([]);

  const getAsyncInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      const token = await AsyncStorage.getItem('token');

      if (value !== null) {
        console.log('hihi', value, 'token', token);
        // We have data!!
        console.log('value');
        setMainUser(value);
        setToken(token!);

        // socket.emit('socketId', value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  useEffect(() => {
    getAsyncInfo();
    // socket.on('message', (data: {data: string; from: string}) => {
    //   console.log('Received message:', data);
    //   // Handle the received message
    // });

    return () => {
      // Clean up event listeners
      // socket.off('message');
    };
  }, []);

  const chats: any[] = useChatList(token);

  useEffect(() => {
    if (chats.length > 0) {
      console.log('setting internal cache');
      setTempChats(chats);
    }
  }, [chats]);

  console.log('check temp', tempChats);
  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {chats.length > 0 || tempChats.length > 0 ? (
          <FlatList
            data={chats.length > 0 ? chats : tempChats}
            renderItem={({item}) => <ChatComponent item={item} />}
            keyExtractor={item => item.target_user_id as any}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>❤️ Go to discover and match your new gyMatess! ❤️</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
