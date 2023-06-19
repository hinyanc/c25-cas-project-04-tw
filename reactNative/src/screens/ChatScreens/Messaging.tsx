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
import {socket} from '../../utils/socket';

interface Message {
  to: string;
  message: string;
}

interface UserInfo {
  userId: string;
}

const Messaging = ({route, navigation}: any) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [mainUser, setMainUser] = useState('');
  const [targetUserId, setTargetUserId] = useState('');
  const [targetSocketId, setTargetSocketId] = useState('');
  const [token, setToken] = useState('');
  const {target_username, target_user_id} = route.params;
  console.log('check target', target_username, target_user_id);
  const [enabled, setEnabled] = useState(true);
  const [temp, setTemp] = useState<any[]>([]);

  // useEffect(() => {
  //   console.log('try emitting to server', socket.id);
  //   if (token !== '') {
  //     socket.emit('hi', {
  //       message: 'hi',
  //       socketId: socket.id,
  //       token: token,
  //     });
  //   }
  // }, [token]);

  const getAsyncInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      const token = await AsyncStorage.getItem('token');

      if (value !== null && targetUserId !== '' && token !== '') {
        console.log('check value message ', value, token, targetUserId);
        setMainUser(value);
        setToken(token!);

        const response = await fetch(
          `http://192.168.160.72:8080/getSocketId/userId/${targetUserId}`,
        );
        const data = await response.json();
        console.log('check data', data);
        setTargetSocketId(data.socketId);
      }
    } catch (e) {
      console.error(e);
    }
  };

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
    setTargetUserId(target_user_id);
  }, []);

  // Get user info from Async Storage
  useEffect(() => {
    getAsyncInfo();
  });

  const chatMessages = useGetMessages(targetUserId, token, enabled);

  // terminate auto fetch upon first successful history fetch
  useEffect(() => {
    if (chatMessages.length > 0) {
      console.log('set temp');
      setTemp(chatMessages);
      setEnabled(false);
    }
  }, [chatMessages]);

  const handleNewMessage = (event: React.FormEvent) => {
    event.preventDefault();
    onCreateMessages.mutate({
      message,
      target_user_id,
      main_user_id: parseInt(mainUser),
      token,
    });

    setMessage('');
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {temp[0] ? (
          <FlatList
            data={temp}
            inverted
            contentContainerStyle={{flexDirection: 'column-reverse'}}
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
      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={value => setMessage(value)}
          value={message}
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
