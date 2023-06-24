import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Goals, useGetGoals} from '../../hooks/goalAPI';
import {REACT_APP_API_SERVER} from '@env';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const TargetGoals = () => {
  const [token, setToken] = useState('');
  const [addGoals, setAddGoals] = useState('');

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

  const [modalVisible, setModalVisible] = useState(false);
  const [render, setRender] = useState(false);

  const goalList = useGetGoals(token, render);
  // console.log(goalList);

  const GoalsCheckboxComponent = () => {
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    const handleCheck = async (
      id: number,
      isChecked: boolean,
      token: string,
    ) => {
      if (checkedIds.includes(id)) {
        setCheckedIds(checkedIds.filter(checkedId => checkedId !== id));
      } else {
        setCheckedIds([...checkedIds, id]);
      }

      try {
        await fetch(`${REACT_APP_API_SERVER}/goal/update-goals/${id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error('Error updating goal item:', error);
      }
    };

    const renderItem = ({item}: {item: Goals}) => {
      // const [checkState, setCheckState] = useState<boolean>(item.is_completed)
      return (
        <BouncyCheckbox
          isChecked={item.is_completed}
          text={item.name}
          key={item.id}
          onPress={(isChecked: boolean) =>
            handleCheck(item.id, isChecked, token)
          }
          iconStyle={{borderColor: '#E24E59'}}
          style={{marginLeft: 25, paddingBottom: 10}}
          textStyle={{width: ScreenWidth * 0.8}}
          fillColor="#E24E59"
        />
      );
    };

    return (
      <FlatList
        data={goalList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  };

  const handleInputChange = (text: string) => {
    setAddGoals(text);
  };
  const handleSubmit = async () => {
    setModalVisible(!modalVisible);
    await fetch(`${REACT_APP_API_SERVER}/goal/add-goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addGoals: addGoals,
      }),
    });
    setRender(!render);
    setAddGoals('');
  };

  return (
    <View>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text style={styles.setGoal}>Target Goals</Text>
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
            <View
            // directionalLockEnabled={true}
            // contentContainerStyle={styles.scrollModal}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Add your goal</Text>
                  <TextInput
                    placeholder="Enter your goal here"
                    placeholderTextColor="#B1B1B1"
                    value={addGoals}
                    onChangeText={handleInputChange}
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
                      onPress={() => {
                        handleSubmit();
                      }}>
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
            </View>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons
            name="add-circle-sharp"
            size={35}
            color={'#E24E59'}
            style={styles.setGoal}
          />
        </TouchableOpacity>
      </View>
      <View>
        <GoalsCheckboxComponent />
      </View>
    </View>
  );
};

export default TargetGoals;
