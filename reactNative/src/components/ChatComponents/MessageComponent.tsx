import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../../utils/styles';
const moment = require('moment');

export default function MessageComponent({item, targetUserId}: any) {
  const status = item.sender_id !== targetUserId;

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
    </View>
  );
}
