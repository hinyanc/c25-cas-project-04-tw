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
            ? styles.mmessageWrapper
            : [styles.mmessageWrapper, {alignItems: 'flex-end'}]
        }>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {/* <View>
            <Image source={item.profile_pic} style={styles.mprofilepic} />
          </View> */}
          <View
            style={
              status
                ? styles.mmessage
                : [styles.mmessage, {backgroundColor: 'rgb(252, 215, 221)'}]
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
