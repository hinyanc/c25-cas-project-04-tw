import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import {styles} from '../../utils/styles';
import { useChatList } from
import socket from '../../utils/socket';

const Chat = () => {
  // const [chats, setChats] = useState<ChatList[]>([]);

  const chats = [
    {
      target_user_id: 1,
      profile_pic: require('../../assets/img/mui.jpeg'),
      target_username: 'Mui',
      last_message: 'hihi',
      updated_at: '7:30 am',
    },
    {
      target_user_id: 3,
      profile_pic: require('../../assets/img/day.jpeg'),
      target_username: 'Day',
      last_message: 'hibye',
      updated_at: '2:30 am',
    },
  ];

  // useEffect(() => {
  //   const fetchChats = async () => {
  //     try {
  //       const response = await fetch('http://locolhost:8080/chatList');
  //       const data = await response.json();
  //       if (response.status === 200) {
  //         setChats(data);
  //       } else {
  //         console.error('Error retrieving chats:', data);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving messages:', error);
  //     }
  //   };
  //   fetchChats();
  // }, []);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({item}) => <ChatComponent item={item} />}
            keyExtractor={item => item.target_user_id as any}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Go to discover and match your new gyMatess!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
