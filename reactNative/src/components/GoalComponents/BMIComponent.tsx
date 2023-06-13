import React, {useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from '../../utils/styles';

const BMI = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{height: 50, marginBottom:30}}>
      <View
        style={{flex: 2, flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Text style={styles.BMI}>Your BMI: 21</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity 
            // style={styles.container} 
            activeOpacity={1} 
            onPressOut={() => {setModalVisible(false)}}
          >
            <ScrollView 
              directionalLockEnabled={true} 
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
