import {View, Text, Pressable, TextStyle, StyleProp} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../utils/styles';
import {StackParamList} from '../../../App';
import type {StackNavigationProp} from '@react-navigation/stack';

interface ChatComponentProps {
  message: string;
  sender_id: number;
  sender_name: string;
  receiver_id: number;
  receiver_name: string;
  updated_at: Date;
}

const ChatComponent = ({
  message,
  sender_id,
  receiver_id,
  updated_at,
  receiver_name,
}: ChatComponentProps) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      receiverName: receiver_name,
      senderId: sender_id,
    });
  };
  // const [messages, setMessages] = useState<Message>({text: '', time: ''});

  // // Retrieves the last message in the array from the item prop
  // useLayoutEffect(() => {
  //   setMessages(item.messages[item.messages.length - 1]);
  // }, []);

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <IonIcon
        name="hi"
        size={45}
        color="black"
        style={styles.cavatar as any}
      />

      <View style={styles.crightContainer}>
        <View>
          <Text style={styles.cusername}>{receiver_name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
