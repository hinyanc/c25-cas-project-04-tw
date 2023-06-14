// import React, {useState} from 'react';
// import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
// import {styles} from '../../utils/styles';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import BouncyCheckbox from "react-native-bouncy-checkbox";

// type Task = {
//   id: number;
//   label: string;
//   checked: boolean;
// };

// const task: Task[] = [
//   {id: 1, label: "Workout 3 times a week!!", checked: false},
//   {id: 2, label: "Match 1 gym mate a week!", checked: false},
//   {id: 3, label: "Lose weight!!", checked: false},
//   {id: 4, label: "Body fat lower than 25%", checked: true},
// ]

// const TargetGoals = () => {
//   const [tasks, setTasks] = useState<Task[]>(task);
//   const [inputValue, setInputValue] = useState('');

//   const handleAddTask = () => {
//     if (inputValue) {
//       const newTask: Task = {
//         id: tasks.length + 1,
//         label: inputValue,
//         checked: false,
//       };
//       setTasks([...tasks, newTask]);
//       setInputValue('');
//     }
//   };

//   const handleToggleTask = (id: number) => {
//     const updatedTasks = tasks.map(task =>
//       task.id === id ? {...task, checked: !task.checked} : task,
//     );
//     setTasks(updatedTasks);
//   };

//   const renderTask = (task: Task) => {
//     const handleToggle = () => handleToggleTask(task.id);
//     const isCompleted = task.checked;

//     return (
//       <View key={task.id} style={styless.task}>
//         <TouchableOpacity style={styless.checkbox} onPress={handleToggle}>
//           {isCompleted ? (
//             <Ionicons name="checkmark-circle-outline" size={24} color="#E24E59" />
//           ) : (
//             <Ionicons name="ellipse-outline" size={24} color="#E24E59" />
//           )}
//         </TouchableOpacity>
//         <TextInput
//           style={[styless.label, isCompleted && styless.completedLabel]}
//           value={task.label}
//           editable={false}
//         />
//       </View>
//     );
//   };

//   const completedTasks = tasks.filter(task => task.checked);
//   const uncompletedTasks = tasks.filter(task => !task.checked);

//   return (
//     <View>
//       <View
//         style={{
//           marginTop: 70,
//           flexDirection: 'row',
//           alignItems: 'flex-end',
//           justifyContent: 'center',
//         }}>
//         <Text style={styles.setGoal}>Target Goals</Text>
//         <TouchableOpacity onPress={handleAddTask}>
//           <Ionicons
//             name="add-circle-sharp"
//             size={35}
//             color={'#E24E59'}
//             style={styles.setGoal}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styless.taskList}>
//         {uncompletedTasks.map(renderTask)}
//       </View>
//       <View style={styless.completedTasks}>
//         <Text style={styles.setGoal}>Completed Tasks</Text>
//         {completedTasks.map(renderTask)}
//       </View>
//     </View>
//   );
// };

// export default TargetGoals;

// const styless = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   inputArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'blue',
//     borderRadius: 10,
//     paddingHorizontal: 10,
//     marginRight: 10,
//   },
//   addButton: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'blue',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   taskList: {
//     flex: 1,
//   },
//   completedTasks: {
//     marginTop: 20,
//   },
//   completedTasksTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   task: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   checkbox: {
//     marginRight: 10,
//   },
//   label: {
//     fontSize: 16,
//   },
//   completedLabel: {
//     textDecorationLine: 'line-through',
//     color: 'gray',
//   },
// });

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
    {id: 'checkbox-1', title: 'First checkbox'},
    {id: 'checkbox-2', title: 'Second checkbox'},
    {id: 'checkbox-3', title: 'Third checkbox'},
    {id: 'checkbox-4', title: 'Forth checkbox'},
  ];

  const [toggleCheckbox, setToggleCheckbox] = useState<any>({});
  const [addTask, setAddTask] = useState([]);
  const [title, setTitle] = useState('');
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
        style={{paddingBottom: 10}}
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
