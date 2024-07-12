import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, TextInput } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://finxs.com';

const UploadPasswordsComponent = () => {
  const [authToken, setAuthToken] = useState('');
  const [accessCode, setAccessCode] = useState('AUS-SportsApp');
  const [passwords, setPasswords] = useState([]);


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

  const handleUploadPasswords = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/values/passwords/upload`, {
        auth_token: authToken,
        access_code: accessCode,
        passwords: passwords.map(password => password.value),
      });

      const responseData = response.data;
      if (responseData.success) {
        console.log('Password upload successful.');
        Alert.alert('Password Upload Successful', 'New passwords have been uploaded.');
      } else {
        console.error('Password upload failed:', responseData.message);
        Alert.alert('Password Upload Failed', responseData.message);
      }
    } catch (error) {
      console.error('Error during password upload:', error.message);
      Alert.alert('Error', 'Something went wrong with password upload.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter passwords, separated by commas"
        onChangeText={text => {
          const passwordArray = text.split(',').map(value => ({ value: value.trim() }));
          setPasswords(passwordArray);
        }}
      />
      <Button title="Upload Passwords" onPress={handleUploadPasswords} />
    </View>
  );
};

export default UploadPasswordsComponent;
