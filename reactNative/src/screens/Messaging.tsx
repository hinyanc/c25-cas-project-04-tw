import Reacr, {useLayoutEffect, useState} from 'react';
import {View, TextInput, Text, FlatList, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessageComponent from '../components/MessagingComponent';
import {styles} from '../utils/styles';

const Messaging = ({route, navigation}:any) => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      text: 'I like React Native!',
      time: '10:00',
      user: 'Yannes',
    },
    {
      id: '2',
      text: 'I think so!',
      time: '10:10',
      user: 'Julia',
    },
  ]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState('');

  // Access the chatroom's name and id from the route object
  const {name, id} = route.params;

  // This function gets the usersname saved on AsyncStorage
  const getUsername = async () => {
    try {
      const valve = await AsyncStorage.getItem('username');
      if (valve !== null) {
        setUser(valve);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set the header title to the name chatroom's name
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
    getUsername();
  }, []);

  /* 
        This function gets the time the user sends a message, then 
        logs the username, message, and the timestamp to the console.
     */

  const handleNewMessage = () => {
    const hour =
      new Date().getHours() < 10
        ? `0${new Date().getHours()}`
        : `${new Date().getHours()}`;

    const mins =
      new Date().getMinutes() < 10
        ? `0${new Date().getMinutes()}`
        : `${new Date().getMinutes()}`;

    console.log({
      message,
      user,
      timestamp: {hour, mins},
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
              <MessageComponent item={item} user={user} />
            )}
            keyExtractor={item => item.id}
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
            <Text style={{color: '#f2f0f1', fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Messaging;
