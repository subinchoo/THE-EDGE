import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import smtpConfig from './smtpConfig'; 

const FormScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const navigation = useNavigation();
  const serverAddress = 'http://localhost:3000';
  

  const handleSubmit = () => {
    alert('Thank you! get in touch soon!')
    // const { smtpServer, tls, starttlsPort, sslPort } = smtpConfig;
    // const emailData = {
    //   firstName,
    //   lastName,
    //   email,  
    //   comment,
    // };
    // fetch( `${serverAddress}/sendEmail`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       console.log('Email sent successfully.');
    //       alert('Email is sent to TIS');
    //     } else {
    //       console.log('Email could not be sent.');
    //       alert('Try again')
    //       navigation.navigate('FinxSMain');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
      
  };
  const handleGoBack = () => {
    navigation.navigate('FinxSSignUp');
  };


  return (
    <View style={[styles.container, { marginTop: 100 }]}>
      <Text style={styles.headerText}>Fill Out the Form</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.commentInput}
        placeholder="Comment"
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>
      <Text style = {styles.backText}onPress={handleGoBack}>Go Back</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 24,
    textAlign :"center",
    fontWeight: 'bold',
    color: '#023B64', 
    marginBottom: 20,
  },
  input: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  commentInput: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 120,
  },
  submitButton: {
    backgroundColor: '#D73E3F',
    borderWidth: 2,
    borderColor: 'red', 
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,

  },
  submitButtonText: {
    color: 'white', 
    fontSize: 16,
    fontWeight : 'bold'
  },
  backText:{
    color:'black',
    fontsize:20,
    marginTop:20,
    textAlign:'center'
  },
  
});

export default FormScreen;
