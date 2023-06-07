import {View, Text, Pressable} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Icon from 'react-native-ionicons';
// import {useNavigation} from '@react-navigation/native';
import {styles} from '../utils/styles';
// import {StackNavigationProp} from '@react-navigation/stack';

// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';


interface ChatComponentProps {
  item:any
}

interface Message {
  text: string;
  time: string;
}


const ChatComponent = ({item}:ChatComponentProps) => {
  // const navigation = useNavigation();
  const [messages, setMessages] = useState<Message>({text: '', time: ''});

  // Retrieves the last message in the array from the item prop
  useLayoutEffect(() => {
    setMessages(
      item.messages[item.messages.length - 1] || {text: '', time: ''},
    );
  }, []);

// const handleNavigation = () => {
//   navigation.navigate('Messaging', {
//     id: item.id,
//     name: item.name,
//   });
// };

function handleNavigation ({navigation}:any) {
  navigation.navigate('Messaging', {
    id: item.id,
    name: item.name,
  });
}

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <Icon
        name="person-circle-outline"
        size={45}
        color="black"
        style={styles.cavatar}
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
