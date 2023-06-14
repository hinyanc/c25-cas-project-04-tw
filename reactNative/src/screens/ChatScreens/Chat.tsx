import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
import {styles} from '../../utils/styles';
import {useChatList} from '../../hooks/chatAPI';
import socket from '../../utils/socket';

const Chat = () => {
  const chats = useChatList();

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
