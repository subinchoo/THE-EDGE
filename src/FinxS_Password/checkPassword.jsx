import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, TextInput, StyleSheet ,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const API_BASE_URL = 'https://finxs.com';

const CheckPasswordStatusComponent = ({ navigation }) => {
  const [authToken, setAuthToken] = useState('');
  const [accessCode, setAccessCode] = useState('AUS-SportsApp');
  const [password, setPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [resultStatus, setResultStatus] = useState('');

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken !== null) {
        setAuthToken(storedToken);
        console.log('Stored Token:', storedToken);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCheckPasswordStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/values/passwords/show_status`, {
        params: {
          auth_token: authToken,
          access_code: accessCode,
          password: password,
        },
      });

      const responseData = response.data;
      if (responseData.success) {
        const { password_status, result_status } = responseData;
        setPasswordStatus(password_status);
        setResultStatus(result_status);
        console.log('Password Status:', password_status);
        console.log('Result Status:', result_status);
      } else {
        console.error('Password status check failed:', responseData.message);
        Alert.alert('Password Status Check Failed', responseData.message);
      }
    } catch (error) {
      console.error('Error during password status check:', error.message);
      Alert.alert('Error', 'Something went wrong with password status check.');
    }
  };

  const handleGoBack = () => {
    // navigation.goBack();
    navigation.navigate('FinxSSignUp');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCheckPasswordStatus}
      >
        <Text style={styles.buttonText}>Check Password Status</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("FinxSMultiPasswordCheck")}
      >
        <Text style={styles.multiText}>Do you have multiple passwords?</Text>
      </TouchableOpacity>




      {passwordStatus && resultStatus && (
        <View style={styles.resultContainer}>
          <Text>Password Status: {passwordStatus}</Text>
          <Text>Result Status: {resultStatus}</Text>

        </View>
      )}


      <Text style = {styles.backText}onPress={handleGoBack}>Go Back</Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  input: {
    width: '60%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#023B64',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  backText:{
    color:'black',
    fontsize:20,
    marginTop:20
  },
  multiText:{
    color:'black',
    fontsize:20,
    marginTop:15
  },
  resultContainer: {
    marginTop: 20,
  },
});


export default CheckPasswordStatusComponent;
