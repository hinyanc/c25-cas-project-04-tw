import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../../utils/styles';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const PlanButton = () => {
  const [promotionCode, setPromotionCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  const handleInputChange = (text: string) => {
    setPromotionCode(text);
  };

  const handleSubmit = () => {
    if (!promotionCode) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  };

  const heart = (
    <Ionicons name="heart-circle-sharp" size={30} color="#FDDBDD" />
  );

  return (
    <View>
      
      <Text style={styles.modalTitle}>
        Limited promotion for our GyMatess Diamond 💎
      </Text>
      <Text style={styles.modalText}>1 month plan: $29.9</Text>
      <Text style={styles.modalText}>Half year plan: $19.9 per month</Text>
      <Text style={styles.modalText}>1 year plan: $9.9 per month</Text>
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
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Enter the promotion code to get 1 month free trial !
                </Text>
                <TextInput
                  placeholder="Enter the promotion code here"
                  maxLength={6}
                  placeholderTextColor="#B1B1B1"
                  // value={promotionCode}
                  // onChangeText={handleInputChange}
                  style={{
                    padding: 0,
                    fontSize: 14,
                    paddingLeft: 10,
                    width: 250,
                    height: 35,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: '#E2868D',
                    color: '#B1B1B1',
                  }}
                />
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={[styles.PlanSubmitBtn]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.BMIChartText}>Submit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.PlanSubmitBtn]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.BMIChartText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>

        </TouchableOpacity>
      </Modal>
      <Button
        buttonStyle={styles.PlanButton}
        icon={heart}
        title="Join Diamond 💎 by NOW!"
        onPress={() => setModalVisible(true)}
      />
      
    </View>
  );
};

export default PlanButton;
