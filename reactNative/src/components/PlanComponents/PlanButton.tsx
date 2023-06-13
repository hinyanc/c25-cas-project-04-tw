import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, colors } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlanButton = () => {
    const heart = <Ionicons name="heart-circle-sharp" size={30} color='#FDDBDD' />;
    return(
        <Button buttonStyle={styles.button}
         icon={heart} title='Join Diamond 💎 by NOW!'/>
    )
}

const styles = StyleSheet.create({
    button: { backgroundColor: "#E24E59", color: '#FDDBDD', borderRadius: 26, width: 260}
  });

export default PlanButton