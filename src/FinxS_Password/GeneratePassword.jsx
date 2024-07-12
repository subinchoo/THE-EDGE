import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://finxs.com'; 

const GeneratePasswordsComponent = () => {
  const [passwords, setPasswords] = useState([]);
  const [authToken, setAuthToken] = useState(null); 


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

  const handleGeneratePasswords = async () => {
    try {

      const response = await axios.post(`${API_BASE_URL}/api/values/passwords/generate`, {
        auth_token: authToken, 
        access_code: 'AUS-SportsApp', 
        number_of_passwords: 20, 
      });

      const responseData = response.data;
      console.log(responseData);
      if (responseData.success) {
        const generatedPasswords = responseData.passwords;
        setPasswords(generatedPasswords);
        console.log('Generated Passwords:', generatedPasswords);
      } else {
        console.error('Password generation failed:', responseData.message);
        Alert.alert('Password Generation Failed', responseData.message);
      }
      
    } catch (error) {
      console.error('Error during password generation:', error.message);
      Alert.alert('Error', 'Something went wrong with password generation.');
    }
  };

  return (
    <View>
      <Button title="Generate Passwords" onPress={handleGeneratePasswords} />
      {passwords.length > 0 && (
        <View>
          <Text>Generated Passwords:</Text>
          {passwords.map((password, index) => (
            <Text key={index}>{`Password ${index + 1}: ${password.value}, Link: ${password.link}`}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default GeneratePasswordsComponent;
