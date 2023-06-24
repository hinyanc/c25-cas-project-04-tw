import {View, Text, Pressable, TextStyle, StyleProp, Image} from 'react-native';
import React from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../../utils/styles';
import {StackParamList} from '../../../App';
import type {StackNavigationProp} from '@react-navigation/stack';
import {REACT_APP_API_SERVER} from '@env';
const moment = require('moment');
// import Swipeout from 'react-native-swipeout';

interface Item {
  item: any;
}

const ChatComponent = ({item}: Item) => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const handleNavigation = () => {
    navigation.navigate('Messaging', {
      target_user_id: item.target_user_id,
      target_username: item.target_username,
    });
  };

  const oriDateTime = item.created_at;
  let parsedDatetime;
  if (oriDateTime != null) {
    parsedDatetime = moment(oriDateTime).fromNow();
  }

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      <View>
        <Image
          source={{
            uri: `${REACT_APP_API_SERVER}/profile-pic/${item.profile_pic}`,
          }}
          style={styles.cprofilepic}
        />
      </View>
      <View style={styles.crightContainer}>
        <View>
          <View style={{justifyContent:'center'}}>
            <Text style={styles.cusername}>{item.target_username}</Text>
            <Text style={styles.ctime}>{parsedDatetime}</Text>
          </View>
          <View style={styles.crightContainer2}>
            <Text style={styles.cmessage}>{item.last_message}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ChatComponent;
