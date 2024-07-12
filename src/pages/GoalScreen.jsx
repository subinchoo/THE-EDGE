import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { TodoStatus } from '../components/Todo';
import GoalList from '../components/GoalList';

export default function Goal() {
  const [list, updateList] = useState([]);
  const [newEntry, updateEntry] = useState('');
  const [goalreached, setGoalReached] = useState(0);
  const [doneImage, setDoneImage] = useState(false); // 이미지 변경 여부 상태

  useEffect(() => {
    const totalTodos = list.length;
    const completedTodos = list.filter((item) => item.status === TodoStatus.completed).length;
    let percentage = 0;

    if (totalTodos > 0) {
      percentage = Math.round((completedTodos / totalTodos) * 100);
    }

    setGoalReached(percentage);

    if (percentage === 100) {
      setDoneImage(true);
    } else {
      setDoneImage(false);
    }
  }, [list]);

  const handleSaveButtonPress = () => {
    if (newEntry.trim() !== '') {
      updateList([...list, { title: newEntry, description: '', status: TodoStatus.open }]);
      updateEntry('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>Current Status</Text>
      <Text style={styles.paragraph}>{goalreached} %</Text>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${goalreached}%`,
            },
          ]}
        />
        {doneImage ? (
          <Image
            source={require('../Images/Goal_Trophy.png')}
            style={[styles.domeImageStyle, { tintColor: 'white' }]}
          />
        ) : (
          <Image
            source={require('../Images/Goal_Runningman.png')}
            style={[styles.imageStyle]}
          />
        )}
      </View>

      <Card>
        <TextInput
          placeholder="What is your Goal?"
          autoCapitalize="none"
          style={localStyles.input}
          onChange={({ nativeEvent }) => {
            updateEntry(nativeEvent.text);
          }}
          value={newEntry}
        />
        <View style={styles.saveButtonContainer}>
          {newEntry.trim() !== '' && ( // TextInput에 값이 있을 때만 Save 버튼을 표시
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveButtonPress}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          )}
        </View>
        <GoalList list={list} updateList={updateList} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 15,
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#023B64',
    borderRadius: 10,
    marginVertical: 10,
    marginBottom: 30,
    height: 50,
    width: '100%',
  },
  progressBar: {
    backgroundColor: '#B69B68',
    borderRadius: 10,
    height: 10,
    width: '90%',
  },
  imageStyle: {
    width: 45,
    height: 45,
  },
  domeImageStyle: {
    width: 45,
    height: 45,
    marginLeft: -45,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  saveButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  saveButton: {
    backgroundColor: '#B69B68',
    padding: 5,
    margin:5,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
  },
});

const localStyles = {
  input: {
    padding: 20,
    fontSize: 18,
    fontStyle: 'italic',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
};
