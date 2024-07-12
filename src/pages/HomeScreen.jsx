import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Alert, Image } from "react-native";
import Modal from 'react-native-modal';

import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [userData, setUserData] = useState({ username: null, team: null });

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setProfileModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const toggleProfileModal = () => {
    setProfileModalVisible(!isProfileModalVisible);
  };

  const getUsernameAndTeam = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const team = await AsyncStorage.getItem("team");
      console.log("Username:", username);
      console.log("Team:", team);
      return { username, team };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { username, team } = await getUsernameAndTeam();
        setUserData({ username, team }); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData.username || !userData.team) {
    return (
      <View style={StudioBtnStyle.loadingContainer}>
        <Text style={StudioBtnStyle.loadingText}>Loading...</Text>
      </View>
    );
  }


  return (
    <View style={[StudioBtnStyle.footer, { marginTop: -100, backgroundColor: 'white' }]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Registration')}>
        <Image
          source={require("../Images/logo.png")}
          style={StudioBtnStyle.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={toggleProfileModal}
        style={StudioBtnStyle.profileIcon}
      >
        <FontAwesome5 name="user-circle" size={30} color="#B69B68" />
      </TouchableOpacity>
      <Modal
        isVisible={isProfileModalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackdropPress={toggleProfileModal}
        backdropOpacity={0.5}
        style={StudioBtnStyle.profileModal}
      >
        <View style={StudioBtnStyle.profileModalContent}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Profile")}
            style={StudioBtnStyle.profileHeader}>
            <FontAwesome5 name="user-circle" size={50} color="#B69B68" />
            <Text style={StudioBtnStyle.username}>{userData.username}</Text>
            <Text style={StudioBtnStyle.team}>{userData.team}</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Setting")}
            style={StudioBtnStyle.menuItem}>
            <FontAwesome5 name="cog" size={20} color="#023B64" />
            <Text style={StudioBtnStyle.menuText}>Setting</Text>
          </TouchableOpacity>
          <TouchableOpacity style={StudioBtnStyle.menuItem}>
            <FontAwesome5 name="question-circle" size={20} color="#023B64" />
            <Text style={StudioBtnStyle.menuText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StudioBtnStyle.menuItem}>
            <FontAwesome5 name="sign-out-alt" size={20} color="#023B64" />
            <Text
              onPress={handleLogout}
              style={StudioBtnStyle.menuText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => navigation.navigate("FinxSSignUp")}
        style={[StudioBtnStyle.Button, StudioBtnStyle.FinxSButton]}
      >
        <Text style={{ color: "#B69B68", fontSize: 20 }}>TIS Assessment</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Mindset")}
        style={StudioBtnStyle.Button}
      >
        <Text style={{ color: "#B69B68", fontSize: 20 }}>Mindset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Wellbeing")}
        style={StudioBtnStyle.Button}
      >
        <Text style={{ color: "#B69B68", fontSize: 20 }}>Wellbeing</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Performance")}
        style={StudioBtnStyle.Button}
      >
        <Text style={{ color: "#B69B68", fontSize: 20 }}>Performance</Text>
      </TouchableOpacity>
    </View>
  );
}

const StudioBtnStyle = StyleSheet.create({
  Button: {
    borderRadius: 5,
    backgroundColor: "#023B64",
    width: "80%",
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  FinxSButton: {
    alignSelf: 'flex-end',
    marginEnd: 40,
    marginBottom: 50,
    width: "80%",
    height: 120,
    borderColor: "#D73E3F",
    borderWidth: 5,
    backgroundColor: "#023B64",
  },
  footer: {
    width: "100%",
    height: "135%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileIcon: {
    position: 'relative',
    right: 150,
    marginBottom: 100,
    marginTop: -40
  },
  profileModal: {
    margin: 0,
    justifyContent: 'center',
    width: "70%",
    height: "100%",
    alignSelf: 'flex-start',
  },
  profileModalContent: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
  },
  profileHeader: {
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  team: {
    fontSize: 16,
    color: '#B69B68',
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#023B64',
  },
  logo: {
    width: 420,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  
});
