import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList, ScrollView} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import {styles} from '../../utils/styles';
import {useChatList} from '../../hooks/chatAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const [token, setToken] = useState('');
  const [tempChats, setTempChats] = useState<any[]>([]);

  useEffect(() => {
    const getAsyncInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          setToken(token!);
        }
      } catch (e) {
        console.error('Error while loading username!');
      }
    };

    getAsyncInfo();
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
    <ScrollView style={styles.chatscreen}>
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
    </ScrollView>
  );
};

export default Chat;
