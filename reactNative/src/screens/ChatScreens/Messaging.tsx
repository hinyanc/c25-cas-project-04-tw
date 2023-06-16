import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  Text,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../../components/ChatComponents/MessageComponent';
import {styles} from '../../utils/styles';
import {useGetMessages} from '../../hooks/messageAPI';
import {useCreateMessages} from '../../hooks/messageAPI';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import socket from '../../utils/socket';

const Messaging = ({route, navigation}: any) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [mainUser, setMainUser] = useState('');
  const [targetUser, setTargetUser] = useState('');
  const [token, setToken] = useState('');
  const [socketId, setSocketId] = useState('');
  const [targetUserSocketId, setTargetUserSocketId] = useState('');

  useEffect(() => {
    socket.on('socketId', (id: string) => {
      setSocketId(id);
    });

    return () => {
      socket.off('socketId');
    };
  }, []);

  const {target_username, target_user_id} = route.params;

  console.log('check target', target_username, target_user_id);

  const getAsyncInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      const token = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.log('check value message ', value, token);
        setMainUser(value);
        setToken(token!);

        const response = await fetch(
          `http://your-server-address:8080/getSocketId?userId=${targetUserSocketId}`,
        );
        const data = await response.json();
        setTargetUserSocketId(data.socketId);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };
  // getMainUserId();
  const onCreateMessages = useMutation(
    async (data: {
      message: string;
      target_user_id: number;
      main_user_id: number;
      token: string;
    }) =>
      useCreateMessages(
        data.message,
        data.target_user_id,
        data.main_user_id,
        token,
      ),
    {
      onSuccess: () => queryClient.invalidateQueries(['message']),
    },
  );

  // Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({title: target_username});
    setTargetUser(target_user_id);
  }, []);

  useEffect(() => {
    getAsyncInfo();
  }, []);

  const flatListRef = useRef<FlatList>(null); // Ref for FlatList
  useEffect(() => {
    flatListRef.current?.scrollToEnd(); // Scroll to the end when the component mounts
  }, []);

  const chatMessages = useGetMessages(targetUser, token);
  const handleNewMessage = () => {
    console.log('new message check main user', mainUser);

    socket.emit('message', {
      data: message,
      from: mainUser,
      to: targetUserSocketId,
    });

    onCreateMessages.mutate({
      message,
      target_user_id,
      main_user_id: parseInt(mainUser),
      token,
      // const hour =
      //   new Date().getHours() < 10
      //     ? `0${new Date().getHours()}`
      //     : `${new Date().getHours()}`;

      // const mins =
      //   new Date().getMinutes() < 10
      //     ? `0${new Date().getMinutes()}`
      //     : `${new Date().getMinutes()}`;
    });
  };

  return (
    <View style={styles.messagingscreen}>
      <ScrollView
        // ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}>
        <View
          style={[
            styles.messagingscreen,
            {paddingVertical: 15, paddingHorizontal: 10},
          ]}>
          {chatMessages[0] ? (
            <FlatList
              data={chatMessages}
              renderItem={({item}) => (
                <MessageComponent item={item} mainUser={mainUser} />
              )}
            />
          ) : (
            <View style={styles.chatemptyContainer}>
              <Text style={styles.chatemptyText}>Start a new chat!</Text>
              <Text>❤️ You are matched with {target_username} ❤️ </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}>
          <View>
            <Text style={{color: '#f2f0f1', fontSize: 20}}>Send</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
