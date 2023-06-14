import React, {useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../utils/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Task = {
  id: number;
  label: string;
  checked: boolean;
};

const task: Task[] = [
  {id: 1, label: "Workout 3 times a week!!", checked: false},
  {id: 2, label: "Match 1 gym mate a week!", checked: false},
  {id: 3, label: "Lose weight!!", checked: false},
  {id: 4, label: "Body fat lower than 25%", checked: true},
]

const TargetGoals = () => {
  const [tasks, setTasks] = useState<Task[]>(task);
  const [inputValue, setInputValue] = useState('');

  const handleAddTask = () => {
    if (inputValue) {
      const newTask: Task = {
        id: tasks.length + 1,
        label: inputValue,
        checked: false,
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  const handleToggleTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? {...task, checked: !task.checked} : task,
    );
    setTasks(updatedTasks);
  };

  const renderTask = (task: Task) => {
    const handleToggle = () => handleToggleTask(task.id);
    const isCompleted = task.checked;

    return (
      <View key={task.id} style={styless.task}>
        <TouchableOpacity style={styless.checkbox} onPress={handleToggle}>
          {isCompleted ? (
            <Ionicons name="checkmark-circle-outline" size={24} color="#E24E59" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#E24E59" />
          )}
        </TouchableOpacity>
        <TextInput
          style={[styless.label, isCompleted && styless.completedLabel]}
          value={task.label}
          editable={false}
        />
      </View>
    );
  };

  const completedTasks = tasks.filter(task => task.checked);
  const uncompletedTasks = tasks.filter(task => !task.checked);

  return (
    <View>
      <View
        style={{
          marginTop: 70,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text style={styles.setGoal}>Target Goals</Text>
        <TouchableOpacity onPress={handleAddTask}>
          <Ionicons
            name="add-circle-sharp"
            size={35}
            color={'#E24E59'}
            style={styles.setGoal}
          />
        </TouchableOpacity>
      </View>
      <View style={styless.taskList}>
        {uncompletedTasks.map(renderTask)}
      </View>
      <View style={styless.completedTasks}>
        <Text style={styles.setGoal}>Completed Tasks</Text>
        {completedTasks.map(renderTask)}
      </View>
    </View>
  );
};

export default TargetGoals;

const styless = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskList: {
    flex: 1,
  },
  completedTasks: {
    marginTop: 20,
  },
  completedTasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
  completedLabel: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});