import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {styles} from '../../utils/styles';

export function UserInfo() {
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        shadowColor: '#CB1F2C',
        shadowOffset: {
          width: 0,
          height: 15,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.5,
        elevation: 5,
      }}>
      <View
        style={{
          flex: 2,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/img/day.jpeg')}
          style={{height: 80, width: 80, margin: 20, borderRadius: 15}}
        />
        <View style={{width: 250}}>
          <Text style={styles.hiName}>Hi, Day</Text>
          <Text style={styles.welcome}>Welcome back to GyMatess!</Text>
        </View>
      </View>
    </ScrollView>
  );
}
