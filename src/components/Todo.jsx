import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const TodoStatus = {
  open: 'open',
  inProgress: 'inProgress',
  completed: 'completed',
};

const Todo = ({ index, title, status, updateList }) => {
  let checkIcon = (
    <MaterialCommunityIcons
      name="checkbox-blank-outline"
      size={24}
      style={localStyles.iconLeft}
    />
  );

  if (status === TodoStatus.completed) {
    checkIcon = (
      <MaterialCommunityIcons
        name="checkbox-marked"
        size={24}
        style={localStyles.iconLeft}
        title="complete"
      />
    );
  }

  const handleToggleStatus = () => {
    let updatedStatus;

    if (status === TodoStatus.open) {
      updatedStatus = TodoStatus.completed;
    } else {
      updatedStatus = TodoStatus.open;
    }

    // Update the status using the updateList function
    updateList((list) => {
      list[index].status = updatedStatus;
      return [...list];
    });
  };

  const handleDelete = () => {
    updateList((list) => {
      list.splice(index, 1);
      return [...list];
    });
  };

  return (
    <TouchableOpacity
      style={localStyles.todo}
      onPress={handleToggleStatus} // Change the status on single click
    >
      <View style={localStyles.container}>
        {checkIcon}
        <Text>
          {title.charAt(0).toUpperCase()}
          {title.slice(1)}
        </Text>
      </View>
      <TouchableOpacity style={localStyles.deleteButton} onPress={handleDelete}>
        <Text style={localStyles.deleteButtonText}>Done</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

Todo.propTypes = {
  index: PropTypes.number,
  title: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(TodoStatus)),
  updateSelf: PropTypes.func.isRequired,
};

const localStyles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconLeft: {
    margin: 8
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    elevation: 5,
    position: 'relative',
  },
  deleteButton: {
    marginLeft: 'auto',
    backgroundColor: '#023B64',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  
});


export default Todo;

