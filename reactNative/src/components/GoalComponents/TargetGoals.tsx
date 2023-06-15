import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

type ICheckboxComponent = {
  id: string;
  title: string;
};

type IItem = {
  item: ICheckboxComponent;
};

const generateToggleState = (
  array: ICheckboxComponent[],
  key: string,
  value: boolean,
) => {
  if (!array) return [];
  const initialValue = {};
  return array.reduce((obj, item) => {
    // @ts-ignore
    return item[key]
      ? {
          ...obj,
          // @ts-ignore
          [item[key].replace(/\s/, '')]: value,
        }
      : obj;
  }, initialValue);
};

const TargetGoals = () => {
  const itemList = [
    {id: 'checkbox-1', title: 'Workout 3 times a week!!'},
    {id: 'checkbox-2', title: 'Match 1 gym mate a week!'},
    {id: 'checkbox-3', title: 'Body fat lower than 25%'},
    {id: 'checkbox-4', title: 'Lose Weight!'},
  ];

  const [toggleCheckbox, setToggleCheckbox] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleState = (item: ICheckboxComponent) =>
    setToggleCheckbox({
      ...toggleCheckbox,
      [item.id]: !toggleCheckbox[item.id],
    });

  useEffect(() => {
    setToggleCheckbox(generateToggleState(itemList, 'id', false));
  }, []);

  const CheckboxComponent = ({item}: IItem) => {
    const {id, title} = item;
    return (
      <BouncyCheckbox
        disableBuiltInState
        fillColor="#E24E59"
        iconStyle={{borderColor: '#E24E59'}}
        isChecked={toggleCheckbox[id]}
        key={id}
        onPress={() => handleToggleState({id, title})}
        style={{marginLeft:25, paddingBottom: 10}}
        text={title}
        textStyle={{textDecorationLine: 'none'}}
      />
    );
  };

  // const NewTask = (id: string, title:string) => {

  //   return (
  //     <BouncyCheckbox
  //       disableBuiltInState
  //       fillColor="red"
  //       iconStyle={{borderColor: 'red'}}
  //       isChecked={false}
  //       key={id}
  //       // onPress={() => handleToggleState({id, title})}
  //       style={{paddingBottom: 10}}
  //       textComponent={
  //         <TextInput
  //           placeholder="Enter your goal here"
  //           value={title}
  //           placeholderTextColor="#B1B1B1"
  //           style={{
  //             padding: 0,
  //             fontSize: 13,
  //             paddingLeft: 10,
  //             width: 200,
  //             height: 30,
  //             backgroundColor: 'white',
  //             marginLeft: 25,
  //             borderWidth: 1,
  //             borderRadius: 16,
  //             borderColor: '#E2868D',
  //             color: '#B1B1B1',
  //           }}
  //         />
  //       }
  //       textStyle={{textDecorationLine: 'none'}}
  //     />
  //   );
  // };
  
  const renderItem = ({item}: IItem) => <CheckboxComponent item={item} />;
  
  // const addNewTask = () => {
  //   const taskArr = [...itemList]
  //   taskArr.push(<NewTask/>)
  // }
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
          <ScrollView
          // directionalLockEnabled={true}
          // contentContainerStyle={styles.scrollModal}
          >
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>
                  Add your goal
                </Text>
                <TextInput
                  placeholder="Enter your goal here"
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
                </TouchableOpacity></View>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </TouchableOpacity>
      </Modal>
        <TouchableOpacity onPress={()=>setModalVisible(true)}>
          <Ionicons
            name="add-circle-sharp"
            size={35}
            color={'#E24E59'}
            style={styles.setGoal}
          />
        </TouchableOpacity>
      </View>
      <SafeAreaView
        style={{
          marginTop: 10,
          height: 140,
        }}>
        <FlatList
          data={itemList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{padding: 2}}
        />
      </SafeAreaView>
    </View>
  );
};

export default TargetGoals;
