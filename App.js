import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addTodo,
  editTodo,
  deleteTodo,
  allTodo,
} from './src/redux/Action/TodoAction';

const App = () => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const data = useSelector(state => state.TodoReducer.todoList);
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);
  const fetchData = async () => {
    const data = await AsyncStorage.getItem('TodoList');
    if (data) {
      dispatch(allTodo(JSON.parse(data)));
    } else {
      dispatch(allTodo([]));
    }
  };
  const handleAddTodo = async () => {
    if (editIndex < 0) {
      data.push({id: Math.random(), todo: todo});
      dispatch(addTodo(data));
      await AsyncStorage.setItem('TodoList', JSON.stringify(data));
      setTodo('');
    } else {
      data[editIndex].todo = todo;
      dispatch(editTodo(data));
      await AsyncStorage.setItem('TodoList', JSON.stringify(data));
      setTodo('');
      setEditIndex(-1);
    }
  };
  const handleEditTodo = index => {
    setEditIndex(index);
    setTodo(data[index].todo);
  };

  const handleDeleteTodo = async index => {
    Alert.alert('Delete Todo', 'Can you want delete ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const deleteData = data.filter(item => item.id != data[index].id);
          dispatch(deleteTodo(data[index]));
          await AsyncStorage.setItem('TodoList', JSON.stringify(deleteData));
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Todo List</Text>
      </View>
      <View style={{marginHorizontal: 10}}>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            placeholder="Enter daily work"
            placeholderTextColor={'#000'}
            onChangeText={val => setTodo(val)}
            style={styles.textInput}
          />
          <TouchableOpacity
            onPress={() => handleAddTodo()}
            style={styles.addButton}>
            <Text style={styles.addbuttonText}>
              {editIndex == -1 ? 'Add' : 'Update'}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          keyExtractor={item => Math.random()}
          renderItem={item => (
            <View style={styles.listContainer}>
              <Text style={styles.todo}>{item.item.todo}</Text>
              <TouchableOpacity
                onPress={() => handleEditTodo(item.index)}
                style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item.index)}
                style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  textInput: {
    width: 230,
    backgroundColor: '#9dd4ea',
    borderRadius: 10,
    paddingLeft: 10,
    color: '#000',
  },
  addButton: {
    width: 100,
    height: 50,
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    height: 50,
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  todo: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 15,
    width: 190,
  },
  editButton: {
    width: 50,
    height: 40,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 80,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  addbuttonText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
});
