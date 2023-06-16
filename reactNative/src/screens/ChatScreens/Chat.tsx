import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import {styles} from '../../utils/styles';
import {useChatList} from '../../hooks/chatAPI';
import socket from '../../utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  // let mainUserId = await AsyncStorage.getItem('mainUserId');
  // let mainUserId = 1;
  // const chats = useChatList(mainUserId!);
  const [mainUser, setMainUser] = useState('');

  const getMainUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      if (value !== null) {
        console.log('hi', value);
        setMainUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  useEffect(() => {
    getMainUserId();
  }, []);
  // useLayoutEffect(() => {
  //   getMainUserId();
  // }, []);

  // let chats: any[] = [];
  // if (mainUser != '') {

  const chats: any[] = useChatList(mainUser);
  const [tempChats, setTempChats] = useState<any[]>([]);

  useEffect(() => {
    if (chats.length > 0) {
      console.log('setting internal cache');
      setTempChats(chats);
    }
  }, [chats]);

  // } else {
  //   chats = [];
  // }
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
