import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from '../../utils/styles';
import {useGetBMI} from '../../hooks/goalAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const BMI = () => {
  const [modalVisible, setModalVisible] = useState(false);
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

  let fetchData = useGetBMI(token);


  function calculateBMI(weight:number, height:number) {
    const m = height /100

    const bmi = weight / (m**2)
    return bmi.toFixed(0)
  }

  const weight = Object.values(fetchData)[0]
  const height = Object.values(fetchData)[1]
  const bmi = calculateBMI(weight, height)


  return (
    <View style={{height: 50, marginBottom: 30}}>
      <View
        style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Text style={styles.BMI}>Your BMI: {bmi}</Text>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: ScreenWidth,
              height: ScreenHeight,
            }}
            activeOpacity={1}
            onPressOut={() => {
              setModalVisible(false);
            }}>
            <ScrollView
            // directionalLockEnabled={true}
            // contentContainerStyle={styles.scrollModal}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>BMI Scale Chart</Text>
                  <Text style={styles.modalText}>＜ 18.5 = Underweight</Text>
                  <Text style={styles.modalText}>＞18.5 - 22.9 = Normal</Text>
                  <Text style={styles.modalText}>23 - 24.9 = Overweight</Text>
                  <Text style={styles.modalText}>＞ 25 = Obese</Text>
                  <TouchableOpacity
                    style={[styles.BMIChartBtn]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.BMIChartText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          style={[styles.BMIChartBtn]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.BMIChartText}>BMI Chart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BMI;
