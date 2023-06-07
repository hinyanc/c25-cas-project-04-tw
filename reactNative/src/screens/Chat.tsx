import React from 'react';
import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../components/ChatComponent';
import  { Feather }  from 'react-native-feather';
import {styles} from '../utils/styles';

const Chat = () => {
  //Dummy list of rooms
  const rooms = [
    {
      id: '1',
      name: 'Tecky',
      messages: [
        {
          id: '1a',
          text: 'Hello, ReactNative is so easy!!',
          time: '07:50',
          user: 'Chinny',
        },
        {
          id: '1b',
          text: 'Hi Chinny, I think so! 😇',
          time: '08:50',
          user: 'Yannes',
        },
      ],
    },
    {
      id: '2',
      name: 'GyMatess Admin',
      messages: [
        {
          id: '2a',
          text: "Girls, who's awake? 🙏🏽",
          time: '12:50',
          user: 'Team Julia',
        },
        {
          id: '2b',
          text: "What's up? 🧑🏻‍💻",
          time: '03:50',
          user: 'Chinny',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>

          {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
          <Pressable onPress={() => console.log('Button Pressed!')}>
            <Feather name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({item}) => <ChatComponent item={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Chat;
