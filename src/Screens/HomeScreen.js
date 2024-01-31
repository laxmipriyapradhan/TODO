import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

export default function HomeScreen() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputPriority, setInputPriority] = useState('');
  const [inputTime, setInputTime] = useState('');

  const [tasks, setTasks] = useState([]);
  const [isUpdateData, setIsUpdateData] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const route = useRoute();
  const { email, uid } = route.params;

  useEffect(() => {
    getTasksFromFirestore();
  }, []);

  const getTasksFromFirestore = () => {
    const unsubscribe = firestore().collection('tasks').onSnapshot((snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return () => unsubscribe();
  };

  const handleAddTask = async () => {
    try {
      if (inputTitle.length > 0 && inputDescription.length > 0 && inputPriority.length > 0 && inputTime.length > 0) {
        await firestore().collection('tasks').add({
          title: inputTitle,
          description: inputDescription,
          priority: inputPriority,
          time: inputTime,
        });

        setInputTitle('');
        setInputDescription('');
        setInputPriority('');
        setInputTime('');
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      if (inputTitle.length > 0 && inputDescription.length > 0 && inputPriority.length > 0 && inputTime.length > 0) {
        await firestore().collection('tasks').doc(taskId).update({
          title: inputTitle,
          description: inputDescription,
          priority: inputPriority,
          time: inputTime,
        });

        setInputTitle('');
        setInputDescription('');
        setInputPriority('');
        setInputTime('');
        setIsUpdateData(false);
        setTaskId(null);
      } else {
        Alert.alert('Error', 'Please fill in all fields');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTaskPress = (taskId, task) => {
    setIsUpdateData(true);
    setTaskId(taskId);
    setInputTitle(task.title);
    setInputDescription(task.description);
    setInputPriority(task.priority);
    setInputTime(task.time);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await firestore().collection('tasks').doc(taskId).delete();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Email: {email}</Text>
      <Text>UID: {uid}</Text> */}

      <TextInput
        style={styles.inputBox}
        placeholder="Title"
        value={inputTitle}
        onChangeText={value => setInputTitle(value)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Description"
        value={inputDescription}
        onChangeText={value => setInputDescription(value)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Priority"
        value={inputPriority}
        onChangeText={value => setInputPriority(value)}
      />
      <TextInput
        style={styles.inputBox}
        placeholder="Time"
        value={inputTime}
        onChangeText={value => setInputTime(value)}
      />

      {!isUpdateData ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddTask()}>
          <Text style={{ color: '#fff' }}>Add Task</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleUpdateTask()}>
          <Text style={{ color: '#fff' }}>Update Task</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskCard}
            onPress={() => handleTaskPress(item.id, item)}
            onLongPress={() => handleDeleteTask(item.id)}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>{item.priority}</Text>
            <Text>{item.time}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  inputBox: {
    width: Dimensions.get('window').width - 32,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    paddingLeft: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  taskCard: {
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 32,
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
});
