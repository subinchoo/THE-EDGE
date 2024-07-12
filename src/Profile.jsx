import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [inputHeight, setInputHeight] = useState('');
  const [inputWeight, setInputWeight] = useState('');
  const [userData, setUserData] = useState({
    username: null,
    team: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const team = await AsyncStorage.getItem("team");
        setUserData({ username, team});
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const updateHeight = (text) => {
    setInputHeight(text);
  };

  const updateWeight = (text) => {
    setInputWeight(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.avatar}
        source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar0.png' }}
      />
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>{userData.username}</Text>
          <Text style={styles.info}>{userData.team}</Text>
        </View>
        <Text style={styles.bodyprofile}>Body</Text>
        <View style={styles.infoContainer}>
          <FontAwesome5 style={styles.label} name="ruler" size={24} color="black" />
          <TextInput
            style={styles.value}
            onChangeText={updateHeight}
            value={inputHeight}
            placeholder="cm"
          />
        </View>
        <View style={styles.infoContainer}>
          <FontAwesome5 style={styles.label} name="weight" size={24} color="black" />
          <TextInput
            style={styles.value}
            onChangeText={updateWeight}
            value={inputWeight}
            placeholder="kg"
          />
        </View>
        {/* My Insight button */}
        <TouchableOpacity
          style={styles.myInsightButton}
          onPress={() => {
            //show cv
          }}
        >
          <View style={styles.buttonContent}>
            <FontAwesome5 style={styles.buttonIcon} name="pen" size={24} color="black" />
            <Text style={styles.buttonText}>
              <Text style={{ color: 'red' }}>I  </Text>nsight
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    backgroundColor: '#023B64',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  doneButton: {
    marginRight: 20,
    marginTop: 70,
  },
  doneButtonText: {
    fontSize: 16,
    color: 'white',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
    backgroundColor: 'lightgray',
  },
  body: {
    marginTop: 100,
  },
  bodyContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 24,
    color: 'black',
    marginLeft: 40,
    flex: 1,
    alignItems: 'flex-start',
  },
  value: {
    fontSize: 16,
    color: 'black',
    flex: 1,
    alignItems: 'auto',
    marginRight: 200,
    marginTop: 10,
  },
  bodyprofile: {
    fontSize: 16,
    color: '#023B64',
    textAlign: 'left',
    fontWeight: 'bold',
    marginLeft: 30,
  },
  icon: {
    marginRight: 10,
  },
  myInsightButton: {
    backgroundColor: 'white',
    borderColor: '#023B64',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 40,
    marginHorizontal: 30,
    height: 60,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  buttonIcon: {
    marginRight: 20,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#023B64',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default ProfileScreen;
