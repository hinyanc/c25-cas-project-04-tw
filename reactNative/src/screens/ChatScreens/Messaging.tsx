import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import MessageComponent from '../../components/ChatComponents/MessageComponent';
import {styles} from '../../utils/styles';
import {useGetMessages} from '../../hooks/messageAPI';
import {useCreateMessages} from '../../hooks/messageAPI';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {socket} from '../../utils/socket';
const Messaging = ({route, navigation}: any) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const {target_username, target_user_id} = route.params;
  const chatMessages = useGetMessages(target_user_id);

  socket.on('confirm', (payload: any) => {
    console.log('check server socket confirm', payload.message);
    queryClient.invalidateQueries({
      queryKey: ['message', {targetUserId: target_user_id}],
    });
  });
  const onCreateMessages = useMutation(
    async (data: {message: string; target_user_id: string}) =>
      useCreateMessages(data.message, data.target_user_id),
    {
      onSuccess: result =>
        queryClient.invalidateQueries({
          queryKey: ['message', {targetUserId: result.target_user_id}],
        }),
    },
  );

  // Sets the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({title: target_username});
  }, []);

  const handleNewMessage = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('check before mutate', target_user_id);
    onCreateMessages.mutate({message, target_user_id});
    setMessage('');
  };

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}>
        {chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            inverted
            contentContainerStyle={{flexDirection: 'column-reverse'}}
            renderItem={({item}) => (
              <MessageComponent item={item} targetUserId={target_user_id} />
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
