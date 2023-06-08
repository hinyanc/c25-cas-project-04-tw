import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../../components/ChatComponents/ChatComponent';
// import {Feather} from 'react-native-feather';
import Icon from 'react-native-vector-icons/Feather';
import {styles} from '../../utils/styles';
// import Modal from '../components/Modal';
import socket from '../../utils/socket';


const Chat = () => {
  // const [visible, setVisible] = useState(false);
  const [rooms, setRooms] = useState([]);

  // Dummy list of rooms
  // const rooms = [
  //   {
  //     id: '1',
  //     name: 'Tecky',
  //     messages: [
  //       {
  //         id: '1a',
  //         text: 'Hello, ReactNative is so easy!!',
  //         time: '07:50',
  //         user: 'Chinny',
  //       },
  //       {
  //         id: '1b',
  //         text: 'Hi Chinny, I think so! 😇',
  //         time: '08:50',
  //         user: 'Yannes',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'GyMatess Admin',
  //     messages: [
  //       {
  //         id: '2a',
  //         text: "Girls, who's awake? 🙏🏽",
  //         time: '12:50',
  //         user: 'Team Julia',
  //       },
  //       {
  //         id: '2b',
  //         text: "What's up? 🧑🏻‍💻",
  //         time: '03:50',
  //         user: 'Chinny',
  //       },
  //     ],
  //   },
  // ];

  // Runs when the component mounts
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch('http://localhost:8080/chat')
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(err => console.error(err));
    }
    fetchGroups();
  }, []);

  // Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on('roomsList', (rooms: any) => {
      setRooms(rooms);
    });
  }, [socket]);

  // const handleCreateGroup = () => setVisible(true);'

  return (
    <SafeAreaView style={styles.chatscreen}>
      {/* <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Chats</Text>
          <Pressable onPress={handleCreateGroup}>
            <Icon name="edit" size={24} color="green" />
          </Pressable>
        </View>
      </View> */}

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({item}) => <ChatComponent item={item} />}
            //  keyExtractor={item => item.id}
            keyExtractor={(item: {id: any}) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {/* {visible ? <Modal setVisible={setVisible} /> : ''} */}
    </SafeAreaView>
  );
};

export default Chat;
  //Dummy list of rooms
  // const rooms = [
  //   {
  //     id: '1',
  //     name: 'Tecky',
  //     messages: [
  //       {
  //         id: '1a',
  //         text: 'Hello, ReactNative is so easy!!',
  //         time: '07:50',
  //         user: 'Chinny',
  //       },
  //       {
  //         id: '1b',
  //         text: 'Hi Chinny, I think so! 😇',
  //         time: '08:50',
  //         user: 'Yannes',
  //       },
  //     ],
  //   },
  //   {
  //     id: '2',
  //     name: 'GyMatess Admin',
  //     messages: [
  //       {
  //         id: '2a',
  //         text: "Girls, who's awake? 🙏🏽",
  //         time: '12:50',
  //         user: 'Team Julia',
  //       },
  //       {
  //         id: '2b',
  //         text: "What's up? 🧑🏻‍💻",
  //         time: '03:50',
  //         user: 'Chinny',
  //       },
  //     ],
  //   },
  // ];

//       return (
//         <SafeAreaView style={styles.chatscreen}>
//           <View style={styles.chattopContainer}>
//             <View style={styles.chatheader}>
//               <Text style={styles.chatheading}>Chats</Text>

//               {/* Displays the Modal component when clicked */}
//               <Pressable onPress={() => setVisible(true)}>
//                 <Icon name="edit" size={24} color="green" />
//               </Pressable>
//             </View>
//           </View>

//           <View style={styles.chatlistContainer}>...</View>
//           {/*
//                 Pass setVisible as prop in order to toggle 
//                 the display within the Modal component.
//             */}
//           {visible ? <Modal setVisible={setVisible} /> : ''}
//         </SafeAreaView>
//       );
// };

// export default Chat;

