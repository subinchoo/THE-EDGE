import React, { useState, useEffect } from 'react';
import { View, Button, Text, Alert, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://finxs.com'; 

const GetPDFReportComponent = () => {
  const [authToken, setAuthToken] = useState('');
  const [accessCode, setAccessCode] = useState('AUS-SportsApp');
  const [password, setPassword] = useState('');
  const [reportName, setReportName] = useState('Browne');
  const [reportLanguage, setReportLanguage] = useState('ENG');


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

  const handleGetPDFReport = async () => {
    try {

      const response = await axios.get(`${API_BASE_URL}/api/values/passwords/report`, {
        responseType: 'arraybuffer',
        params: {
          auth_token: authToken, 
          access_code: accessCode, 
          password: 'n2afY1dcAk', 
          report_name: reportName, 
          report_language: reportLanguage, 
        },
      });

      const pdfFilePath = `${FileSystem.documentDirectory}Report.pdf`;

      await FileSystem.writeAsStringAsync(pdfFilePath, response.data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      Linking.openURL(pdfFilePath)
        .then(() => {
          console.log('PDF Download success');
        })
        .catch((error) => {
          console.error('PDF Error:', error);
          Alert.alert('PDF Open Failed', 'cannot open PDF File');
        });
    } catch (error) {
      console.error('PDF searching error:', error.message);
      Alert.alert('오류', 'PDF searching error');
    }
  };ㅌ

  return (
    <View>
      <Button title="Get PDF Report" onPress={handleGetPDFReport} />
    </View>
  );
};

export default GetPDFReportComponent;
