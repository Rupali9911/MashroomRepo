import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../constant/colors';

const ToDoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [id, setId] = useState(null);

  const RenderIcons = props => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Image source={props.source} style={{height: 20, width: 20}} />
      </TouchableOpacity>
    );
  };

  const DeleteTodo = id => {
    Alert.alert(
      'Wait !!!',
      'Are you sure you want to delete',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            const newList = todoList.filter((item, index, arr) => index !== id);
            setTodoList(newList);
            setTodo('');
            setEdit(false);
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const EditTodo = item => {
    setId(item?.id);
    setEdit(true);
    setTodo(item?.title);
  };

  const renderItem = ({item, index}) => {
    return (
      <View
        style={[styles.card, styles.shadowProp]}>
        <Text style={{flex: 1}}>{item?.title}</Text>
        <RenderIcons
          source={require('../assets/images/delete.png')}
          onPress={() => DeleteTodo(index)}
        />
        <RenderIcons
          source={require('../assets/images/edit.png')}
          onPress={() => EditTodo(item)}
        />
      </View>
    );
  };

  const addTask = title => {
    if (title) {
      setTodoList([
        ...todoList,
        {
          id: Date.now().toString(),
          title: title,
        },
      ]);
      setTodo('');
    }
  };

  const saveTask = title => {
    const newList = todoList.map((item, index, arr) => {
      if (item.id === id) {
        return {
          ...item,
          title: title,
        };
      }
      return item;
    });

    setTodoList(newList);
    setEdit(false);
    setTodo('');
  };

  return (
    <>
      <Text style={styles.heading}>To Do List</Text>
      <TextInput
        placeholder="Enter Your Task..."
        style={styles.input}
        value={todo}
        onChangeText={text => setTodo(text)}
      />
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => (isEdit ? saveTask(todo) : addTask(todo))}>
        <Text style={styles.btnText}>{isEdit ? 'Save' : 'Add'}</Text>
      </TouchableOpacity>

      {todoList?.length > 0 ? (
        <>
          <View style={styles.hrLine} />
          <FlatList
            data={todoList}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
          />
        </>
      ) : null}
    </>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    margin: 10,
    color: colors.white,
    fontWeight: '700',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.black,
    margin: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    backgroundColor: colors.white,
  },
  card: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    gap: 10,
  },
  shadowProp: {
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnContainer: {
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 100,
    padding: 10,
  },
  btnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 20,
  },
  hrLine: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1.5,
    marginVertical: 10,
  },
});
