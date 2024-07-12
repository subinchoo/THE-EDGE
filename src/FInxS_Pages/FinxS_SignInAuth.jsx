import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://finxs.com';

const AuthenticationComponent = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  useEffect(() => {
    loadToken();
  }, []);

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      console.log('Token successfully stored.');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      if (storedToken !== null) {
        setToken(storedToken);
        console.log('Stored token:', storedToken);
        setSubmitButtonEnabled(true); 
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/sign_in`, {
        username: 'Capstone - GLGS',
        password: '@Captsone_Glgs23',
      });
      const responseData = response.data;
      console.log(responseData);
      if (responseData.token) {
        const authToken = responseData.token;
        setToken(authToken);
        saveToken(authToken);
        console.log('Authentication successful. Token:', authToken);
        setAuthenticated(true);
        setSubmitButtonEnabled(false); 
        Alert.alert('Welcome to TIS Assessment !', undefined, [
          {
            text: 'OK',
            onPress: () => {
              setTimeout(() => {
                navigation.navigate('FinxSMain');
              }, 3000);
            },
          },
        ]);
      } else {
        console.error('Authentication failed:', responseData.message);
        Alert.alert('Authentication Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      Alert.alert('Authentication Failed', 'Something went wrong with the sign-in process.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to <Text style={styles.finxSText}>TIS Assessment</Text>
      </Text>
      <TouchableOpacity style={styles.basicButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      
        <TouchableOpacity
          onPress={() => navigation.navigate('FinxSPasswordCheck')}
          style={styles.formButton}
        >
          <Text style={styles.signInButtonText}>Check Password</Text>
        </TouchableOpacity>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#023B64',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  finxSText: {
    color: '#D73E3F',
  },
  basicButton: {
    backgroundColor: '#B69B68',
    borderColor: '#B69B68',
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButtonText: {
    backgroundColor: '#D73E3F',
    borderColor: '#D73E3F',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,

  },
});

export default AuthenticationComponent;