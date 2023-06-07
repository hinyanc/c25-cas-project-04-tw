import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../utils/styles';

// Import socket from the socket.js file in utils folder
import socket from "../utils/socket";

const Modal = ({setVisible}:any) => {
  const [groupName, setGroupName] = useState('');

  // Function that closes the Modal component
  const closeModal = () => setVisible(false);

  // Logs the group name to the console
  const handleCreateRoom = () => {
    socket.emit('createRoom', groupName);
    closeModal();
  };
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Group name"
        onChangeText={value => setGroupName(value)}
      />

      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, {backgroundColor: '#E14D2A'}]}
          onPress={closeModal}>
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;
