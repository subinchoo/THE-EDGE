import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = React.createContext(null);


export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const serverAddress = 'https://server-side-lavmca12v-gs-t.vercel.app';
  const serverAddress = 'http://localhost:3000';

  const onLogin = async () => {
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
  
    try {
      const response = await axios.post(`${serverAddress}/api/login`, {
        username,
        password,
      });
  
      if (response.status === 200) {
        const token = response.data.token;
        await AsyncStorage.setItem("token", token);
  
        const userData = response.data.userData;
  
        if (userData) {
          if (userData.username) {
            await AsyncStorage.setItem("username", userData.username);
          }
  
          if (userData.team) {
            await AsyncStorage.setItem("team", userData.team);
          }
        }
  
        navigation.navigate("Main", {
          screen: "Home",
          params: { username, team: userData ? userData.team : null },
        });
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Check information !");
    }
  };
  
  function navSignUp() {
    navigation.navigate("Main", {
      screen: "SignUp",
    });
  }
  

  return (
    <View style={loginStyles.container}>
      {/* <Text style={loginStyles.headerText}>ATHLETE INSIGHT</Text> */}
      <Image
        source={require('../Images/logo.png')}
        style={loginStyles.logo}
      />
      <View style={loginStyles.textInputContainer}>
        <TextInput
          style={loginStyles.inputBox}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
        <TextInput
          style={loginStyles.inputBox}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />

        <TouchableOpacity onPress={onLogin} style={loginStyles.loginButton}>
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navSignUp}>
          <Text style={loginStyles.paragraph}> Don't have an account? </Text>
        </TouchableOpacity>
      </View>

      {error && (
        <Text style={{ color: "red", fontWeight: "bold" }}>Error: {error}</Text>
      )}
    </View>
  );
}

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  textInputContainer: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 40,
    color: "black",
  },
  inputBox: {
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    width: "70%",
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: "#033b64",
    width: "70%",
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  paragraph: {
    fontSize: 18,
    color: "black",
    fontSize: 10,
    marginTop: 4,
    textDecorationLine: "underline",
  },
  logo: {
    width: 300,
    height: 120,
    resizeMode: 'contain',
  },
});
