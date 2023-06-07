import React from 'react';
import {View, Text, Pressable, SafeAreaView, FlatList} from 'react-native';
import ChatComponent from '../components/ChatComponent';
import {styles} from '../utils/styles';

const Chat = () => {
  //Dummy list of rooms
 const rooms = [
        {
            id: "1",
            name: "Tecky",
            messages: [
                {
                    id: "1a",
                    text: "Hello ReactNative is so easy!!",
                    time: "07:50",
                    user: "Chinny",
                },
                {
                    id: "1b",
                    text: "Hi Tomer, thank you! 😇",
                    time: "08:50",
                    user: "David",
                },
            ],
        },
        {
            id: "2",
            name: "Hacksquad Team 1",
            messages: [
                {
                    id: "2a",
                    text: "Guys, who's awake? 🙏🏽",
                    time: "12:50",
                    user: "Team Leader",
                },
                {
                    id: "2b",
                    text: "What's up? 🧑🏻‍💻",
                    time: "03:50",
                    user: "Victoria",
                },
            ],
        },
    ];

export default Chat;
