import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from '../../utils/styles';
import socket from '../../utils/socket';

interface ChatProps {
  message: string;
  sender_id: number;
  receiver_id: number;
  updated_at: Date;
}

const Chat = () => {
  const [chats, setChats] = useState<ChatProps[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('http://locolhost:8080/chatList');
        const data = await response.json();
        if (response.status === 200) {
          setChats(data);
        } else {
          console.error('Error retrieving chats:', data);
        }
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    };
    fetchChats();
  }, []);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {chats.length > 0 ? (
          <FlatList
            data={chats}
            renderItem={({item}) => <ChatComponent item={item} />}
            keyExtractor={(item: {id: any}) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No chat created</Text>
            <Text>Go to discover and match your new gyMatess!</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
