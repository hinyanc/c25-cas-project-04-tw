import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import {styles} from '../../utils/styles';
import {REACT_APP_API_SERVER} from '@env';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../../App';
import {useGetUsername} from '../../hooks/TinderAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

interface Item {
  username: any;
  profile_pic: any;
}

const MatchPopup = (props: {card: Item}) => {
  console.log('check card', props.card);
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [token, setToken] = useState('');

  const getLocalStorage = async () => {
    let token = await AsyncStorage.getItem('token');
    if (token == null) {
    } else {
      setToken(token!);
    }
  };
  useEffect(() => {
    getLocalStorage();
  });

  let user = useGetUsername(token);
  let userInfo = Object.values(user);
  return props.card ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressOut={() => {
          setModalVisible(false);
        }}>
        <ScrollView
        // directionalLockEnabled={true}
        // contentContainerStyle={styles.scrollModal}
        >
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.matchView,
                {width: ScreenWidth, height: ScreenHeight},
              ]}>
              <Text style={styles.modalTitle}>🏋🏻‍♀️ It's a Match! 🧘🏻‍♂️</Text>
              <Text style={styles.modalText}>
                You and {props.card.username} have liked each other.
              </Text>
              <View>
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    margin: 10,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: `${REACT_APP_API_SERVER}/profile-pic/${userInfo[1]}`,
                  }}
                />
                <Image
                  style={{
                    height: 100,
                    width: 100,
                    margin: 10,
                    borderRadius: 50,
                  }}
                  source={{
                    uri: `${REACT_APP_API_SERVER}/profile-pic/${props.card
                      .profile_pic!}`,
                  }}
                />
              </View>
              <Text>
                Let's click{' '}
                <Text
                  style={{
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                    fontSize: 25,
                    color: '#E24E59',
                  }}
                  onPress={() => {
                    navigation.navigate('Chat');
                  }}>
                  HERE
                </Text>{' '}
                to start chatting with each other!
              </Text>
              <TouchableOpacity
                style={[styles.BMIChartBtn]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.BMIChartText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </Modal>
  ) : (
    <></>
  );
};

export default MatchPopup;
