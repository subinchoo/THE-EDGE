import React, { useState } from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'https://finxs.com'; 

const CheckMultiplePasswordStatusesComponent = ({navigation}) => {
  const [authToken, setAuthToken] = useState('');
  const [accessCode, setAccessCode] = useState('AUS-SportsApp');
  const [statuses, setStatuses] = useState([]);
  const [passwordInput, setPasswordInput] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);

  const handleCheckMultiplePasswordStatuses = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/values/passwords/show_statuses`, {
        auth_token: authToken, 
        access_code: accessCode, 
        passwords: passwordInput.split(',').map(password => password.trim()), 
      });

      const responseData = response.data;
      if (responseData.success) {
        const passwordStatuses = responseData.statuses;
        setStatuses(passwordStatuses);
        setResultVisible(true);
        console.log('Password Statuses:', passwordStatuses);
      } else {
        console.error('Password statuses check failed:', responseData.message);
        Alert.alert('Password Statuses Check Failed', responseData.message);
      }
    } catch (error) {
      console.error('Error during password statuses check:', error.message);
      Alert.alert('Error', 'Something went wrong with password statuses check.');
    }
  };

  const handleGoBack = () => {
    navigation.navigate('FinxSPasswordCheck'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Password separated with ,"
        onChangeText={(text) => setPasswordInput(text)}
        value={passwordInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleCheckMultiplePasswordStatuses}
      >
        <Text style={styles.buttonText}>Check Multiple Password Statuses</Text>
      </TouchableOpacity>
      {resultVisible && (
        <View>
          <Text style={styles.resultText}>Password Statuses:</Text>
          {statuses.map((status, index) => (
            <Text key={index}>
              {`Password ${index + 1}: Status: ${status.password_status}, Result: ${status.result_status}`}
            </Text>
          ))}
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
    padding: 20,
    backgroundColor:'white'
  },
  input: {
    width: '100%',
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
    marginBottom: 10,
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
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckMultiplePasswordStatusesComponent;
