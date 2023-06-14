import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, TextInput, Text, FlatList, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../../components/ChatComponents/MessageComponent';
import {styles} from '../../utils/styles';
import {useGetMessages} from '../../hooks/messageAPI';
import {useCreateMessages} from '../../hooks/messageAPI';
import {useMutation, useQueryClient} from '@tanstack/react-query';
// import socket from '../../utils/socket';

const Messaging = ({route, navigation}: any) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const [mainUser, setMainUser] = useState('');
  const {target_username, target_user_id} = route.params;

  const getMainUserId = async () => {
    try {
      const value = await AsyncStorage.getItem('mainUserId');
      if (value !== null) {
        setMainUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };

  getMainUserId();

  const chatMessages = useGetMessages(mainUser);
  const onCreateMessages = useMutation(
    async (data: {
      message: string;
      target_user_id: number;
      main_user_id: number;
    }) =>
      useCreateMessages(data.message, data.target_user_id, data.main_user_id),
    {
      onSuccess: () => queryClient.invalidateQueries(['message']),
    },
  );

  // Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({title: target_username});
    getMainUserId();
  }, []);

  const handleNewMessage = () => {
    onCreateMessages.mutate({
      message,
      target_user_id,
      main_user_id: parseInt(mainUser),
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
            // keyExtractor={item => item}
          />
        ) : (
          ''
        )}
      </View>

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
