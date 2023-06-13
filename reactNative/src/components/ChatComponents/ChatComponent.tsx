import {View, Text, Pressable, TextStyle, StyleProp} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../utils/styles';
import {StackParamList} from '../../../App';
import type {StackNavigationProp} from '@react-navigation/stack';

interface ChatComponent {
  userId: number;
  username: string;
  content: string;
  updated_at: Date;
}

interface Item {
  item: any;
}

const ChatComponent = ({item}: Item) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [messages, setMessages] = useState({text: ' ', time: ' '});

  // // Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, []);

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      id: item.id,
      name: item.name,
    });
  };

  //

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <IonIcon
        name="person-circle-outline"
        size={45}
        color="black"
        // style={styles.cavatar as StyleProp<TextStyle> | undefined}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{item.name}</Text>

          <Text style={styles.cmessage}>
            {messages?.text ? messages.text : 'Tap to start chatting'}
          </Text>
        </View>
        <View>
          <Text style={styles.ctime}>
            {messages?.time ? messages.time : 'now'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
