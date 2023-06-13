import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from '../../utils/styles';
import socket from '../../utils/socket';

// interface ChatList {
//   id: number;
//   profile_pic: string;
//   username: string;
//   lastMessage: string;
//   updatedAt: string;
// }

const Chat = () => {
  // const [chats, setChats] = useState<ChatList[]>([]);

  const chats = [
    {
      target_user_id: 1,
      profile_pic: '',
      target_username: 'Doug_Beer50',
      last_message: 'hihi',
      updated_at: new Date().toUTCString(),
    },
    {
      target_user_id: 3,
      profile_pic: '',
      target_username: 'Jason',
      last_message: 'hibye',
      updated_at: new Date().toUTCString(),
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

//  const chats = [
//    {
//      id: '1',
//      name: 'Chinny',
//      messages: [
//        {
//          id: '1a',
//          text: 'Hello Julia, React Native is very easy!',
//          time: '07:50',
//          user: 'Julia',
//        },
//        {
//          id: '1b',
//          text: 'Hi Julia, I like React Native! 😇',
//          time: '08:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '2',
//      name: 'Yannes',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '3',
//      name: 'Yannes',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '4',
//      name: 'Yannes',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '5',
//      name: 'Yannes',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '6',
//      name: 'Julia',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//    {
//      id: '7',
//      name: 'Julia',
//      messages: [
//        {
//          id: '2a',
//          text: 'hihi 🙏🏽',
//          time: '12:50',
//          user: 'Julia',
//        },
//        {
//          id: '2b',
//          text: 'Hi Julia, I like React Native too! 😇',
//          time: '03:50',
//          user: 'Julia',
//        },
//      ],
//    },
//  ];
