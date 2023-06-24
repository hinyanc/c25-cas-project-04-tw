import {View, Text, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from '../../utils/styles';
const moment = require('moment');

export default function MessageComponent({item, targetUserId}: any) {
  // const messagesEndedRef = useRef(null);/\
  const status = item.sender_id !== targetUserId;

  // useEffect(() => {
  //   if (messagesEndedRef.current) {
  //     messagesEndedRef.current.scrollIntoView({behavior: 'smooth'});
  //   }

  // },[])
  const oriDateTime = item.created_at;
  let parsedDatetime;
  if (oriDateTime != null) {
    parsedDatetime = moment(oriDateTime).format('YYYY-MM-DD HH:mm');
  }

  return (
    <View>
      <View
        style={
          status
            ? [styles.mmessageWrapper, {alignItems: 'flex-end'}]
            : styles.mmessageWrapper
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <View>
            <Image source={item.profile_pic} style={styles.mprofilepic} />
          </View> */}
          <View
            style={
              status
                ? [styles.mmessage, {backgroundColor: 'rgb(252, 215, 221)'}]
                : styles.mmessage
            }>
            <Text>{item.message}</Text>
          </View>
        </View>
        <Text style={{marginLeft: 40}}>{parsedDatetime}</Text>
      </View>
      {/* <View ref={messagesEndedRef} /> */}
    </View>
  );
}
