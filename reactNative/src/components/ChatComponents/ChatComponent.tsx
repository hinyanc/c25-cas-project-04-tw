import {View, Text, Pressable, TextStyle, StyleProp} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../utils/styles';
import {StackParamList} from '../../../App';
import type {StackNavigationProp} from '@react-navigation/stack';

interface Item {
  item: any;
}

const ChatComponent = ({item}: Item) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  // const [messages, setMessages] = useState({text: ' ', time: ' '});

  // useLayoutEffect(() => {
  //   setMessages(item.messages[item.messages.length - 1]);
  // }, []);

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      target_user_id: item.target_user_id,
      target_username: item.target_username,
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
          <Text style={styles.cusername}>{item.target_username}</Text>

          <Text style={styles.cmessage}>{item.last_message}</Text>
        </View>
        <View>
          <Text style={styles.ctime}>{item.updated_at}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
