import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Todo, { TodoStatus } from './Todo';

const liststyles = StyleSheet.create({
  text: {
    flex: 1,
    padding: 10,
  },
  listcontainer: {
    width: 350
  }
})

const GoalList = ({ list, updateList }) => {
  let TodoView = (
    <Text style={liststyles.text}> No Goals added. </Text>
  );

  if (list && list.length) {
    const ListView = list.map((todo, i) => {
      return (
        <Todo key={`todo-${i}`} index={i} {...todo} updateList={updateList} />
      )
    });

    TodoView = (
      <View style={liststyles.listcontainer}>
        {ListView}
      </View>
    )
  }

  return TodoView;
}

GoalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.oneOf(Object.values(TodoStatus)),
  })),
  updateList: PropTypes.func.isRequired,
};

export default GoalList;