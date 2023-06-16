import {View, Text, Image} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {styles} from '../../utils/styles';

export default function MessageComponent({item, mainUser}: any) {
  // const messagesEndedRef = useRef(null);/\
  const status = item.sender_id == mainUser;

  // useEffect(() => {
  //   if (messagesEndedRef.current) {
  //     messagesEndedRef.current.scrollIntoView({behavior: 'smooth'});
  //   }

  // },[])

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
        <Text style={{marginLeft: 40}}>{item.updated_at}</Text>
      </View>
      {/* <View ref={messagesEndedRef} /> */}
    </View>
  );
}
