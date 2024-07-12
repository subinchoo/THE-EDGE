import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [team, setTeam] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [error, setError] = useState('');
  const { handleSubmit, control } = useForm();
  const [sportOpen, setsportOpen] = useState(false);
  const [sportValue, setSportValue] = useState('');
  const [sport, setSport] = useState([
    { label: 'Netball', value: 'netball' },
    { label: 'Soccer', value: 'soccer' },
    { label: 'Football', value: 'football' },
    { label: 'Basketball', value: 'basketball' },
    { label: 'Baseball', value: 'baseball' },
  ]);

  const onSportOpen = useCallback(() => {}, []);

  const [newSport, setNewSport] = useState(''); 

  
  // auth
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);


  const serverAddress = 'http://localhost:3000';


const handleSignUp = async () => {
  try {
    const response = await axios.post(`${serverAddress}/api/athletes`, {
      username: username,
      password: password,
      email: email,
      team: team,
      phoneNum: phoneNum,
      sport: sportValue === 'other' ? newSport : sportValue, 
    });

    if (response.status === 201) {
      console.log('User registered successfully');
      alert('Welcome to Athlete Insight!');
      const userData = {
        username: username,
        password: password,
        email: email,
        team: team,
        phoneNum: phoneNum,
        sport: sportValue === 'other' ? newSport : sportValue, 
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

//main 안에 login 있는 이 부분때문에 겹치는듯...?
      navigation.navigate('Main', {
        screen: 'Login',
        params: { username, password },
      });
    }
  } catch (error) {
    console.error('Error during registration:', error.message);
    alert('Registration Failed', 'Something went wrong with the registration process.');
  }
};



  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[a-zA-Z0-9]+@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  function navLogin(e) {
    navigation.navigate('Main', {
      screen: 'Login',
    });
  }

  return (
    <View style={signupStyle.container}>
      <Text style={signupStyle.headerText}>HELLO ATHLETE</Text>
      <View style={signupStyle.textInputContainer}>
        <TextInput
          style={signupStyle.inputBox}
          value={username}
          placeholder="Username"
          onChangeText={setUsername}
        />
        <TextInput
          style={signupStyle.inputBox}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={signupStyle.inputBox}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          onChange={handleEmail}
        />
        <TextInput
          style={signupStyle.inputBox}
          placeholder="Team"
          value={team}
          onChangeText={setTeam}
        />
        <TextInput
          style={signupStyle.inputBox}
          placeholder="Phone Number"
          value={phoneNum}
          onChangeText={setPhoneNum}
        />
        <View style={signupStyle.dropdownSport}>
          <DropDownPicker
            dropDownDirection="TOP"
            style={signupStyle.dropdown}
            open={sportOpen}
            value={sportValue}
            items={[
              ...sport,
              { label: 'Other', value: 'other' }, // "Other" 옵션 추가
            ]}
            defaultValue={sportValue}
            setOpen={setsportOpen}
            setValue={setSportValue}
            setItems={setSport}
            placeholder="Select Sport"
            placeholderStyle={signupStyle.placeholderStyles}
            activityIndicatorColor="#5188E3"
            searchable={true}
            searchPlaceholder="Search your sport here..."
            onOpen={onSportOpen}
            onchangeItem={(item) => setSportValue(item.value)}
          />
        </View>
        {sportValue === 'other' && ( 
          <TextInput
            style={signupStyle.inputBox}
            placeholder="Enter Your Sport"
            value={newSport}
            onChangeText={setNewSport}

          />
        )}
        <TouchableOpacity onPress={handleSignUp} style={signupStyle.loginButton}>
          <Text style={{ color: 'white' }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={navLogin}>
          <Text style={signupStyle.links}> Already have an account? </Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={{ color: 'red', fontWeight: 700 }}> {error}</Text>}
    </View>
  );
}

const signupStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#033b64',
  },
  textInputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
  },
  inputBox: {
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
    width: '70%',
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
  },
  loginButton: {
    borderRadius: 5,
    backgroundColor: 'black',
    width: '70%',
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dropdownSport: {
    width: '75%',
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    marginBottom: 25,
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
  },
  placeholderStyles: {
    color: 'grey',
  },
  links: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
  },
});
