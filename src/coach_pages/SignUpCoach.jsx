import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DropDownPicker from "react-native-dropdown-picker";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUpScreenCoach({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [team, setTeam] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const [sportOpen, setsportOpen] = useState(false);
  const [sportValue, setSportValue] = useState("");
  const [sport, setSport] = useState([
    { label: "Netball", value: "netball" },
    { label: "Soccer", value: "soccer" },
    { label: "Football", value: "football" },
    { label: "Basketball", value: "basketball" },
    { label: "Baseball", value: "baseball" },
  ]);

  const onSportOpen = useCallback(() => {
  }, []);

  //auth
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  // const serverAddress = 'https://server-side-lavmca12v-gs-t.vercel.app'; 

  const serverAddress = 'http://localhost:3000';

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${serverAddress}/api/coach`, {
        username: username,
        password: password,
        email: email,
        team: team,
        phoneNum: phoneNum,
        sport: sportValue
      });

      if (response.status === 201) {
        console.log('User registered successfully');
        alert("welcome to athlete insight!");
        const userDataCoach = {
          username: username,
          password: password,
          email: email,
          team: team,
          phoneNum: phoneNum,
          sport: sportValue
        };
        await AsyncStorage.setItem("userDataCoach", JSON.stringify(userDataCoach));

        // Navigate to the appropriate screen after successful registration
        navigation.navigate('MainCoach', {
          screen: 'LoginCoach',
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

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /[a-zA-Z]/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };


  function navLogin(e) {
    navigation.navigate('MainCoach', {
      screen: 'LoginCoach'
    })
  };

  return (
    <View style={signupStyle.container}>
      <Text style={signupStyle.headerText}>HELLO COACH</Text>
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
        <Controller
          name="sport"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (

            <View style={signupStyle.dropdownSport}>
              <DropDownPicker
                dropDownDirection="TOP"
                style={signupStyle.dropdown}
                open={sportOpen}
                value={sportValue}
                items={sport}
                defaultValue={sportValue}
                setOpen={setsportOpen}
                setValue={setSportValue}
                setItems={setSport}
                placeholder="Select Sport"
                placeholderStyle={signupStyle.placeholderStyles}
                loading={loading}
                activityIndicatorColor="#5188E3"
                searchable={true}
                searchPlaceholder="Search your sport here..."
                onOpen={onSportOpen}
                onchangeItem = {(item)=> setSportValue(item.value)}
                onChangeValue={onChange}
                zIndex={1000}
                zIndexInverse={3000}
                autoScroll={true}
              />
            </View>

          )}
        />
       
        

        <TouchableOpacity
          onPress={handleSignUp}
          style={signupStyle.loginButton}
        >
          <Text style={{ color: "white" }}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navLogin}
        >
          <Text style={signupStyle.links}> Already have account? </Text>
        </TouchableOpacity>

      </View>
      {
        error && <Text style={{ color: "red", fontWeight: 700 }}> {error}</Text>
      }
    </View>
  );
}

  const signupStyle = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#033b64",
    },
    textInputContainer: {
      width: "100%",
      alignItems: 'center',
      gap: 10,
      marginTop: 20,
      marginBottom: 10,
    },
    headerText: {
      fontWeight: "bold",
      fontSize: 40,
      color: "white"
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
      backgroundColor: "black",
      width: "70%",
      height: 40,
      paddingHorizontal: 10,
      paddingVertical: 2,
      fontSize: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    checkboxContainer: {
      flexDirection: 'row',

    },
    checkbox: {
      alignSelf: 'center'
    },
    paragraph: {
      color: 'white',
      fontSize: 12,
      marginTop: 4
    },
    text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
    },
    dropdownSport: {
      width: "75%",
      height: 30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      fontSize: 16,
      marginBottom: 25,

    },
    dropdown: {
      borderColor: "#B7B7B7",
      height: 50,
      // zIndex : 10,
    },
    placeholderStyles: {
      color: "grey",
    },
    label: {
      marginBottom: 7,
      marginStart: 10,
    },
    links: {
      textAlign: "center",
      textDecorationLine: "underline",
      color: "#758580",
    },
  });
// import React, { useState, useCallback } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function SignUpCoach({ navigation }) {
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [emailValid, setEmailValid] = useState('');
//   const [team, setTeam] = useState('');
//   const [phoneNum, setPhoneNum] = useState('');
//   const [error, setError] = useState('');
//   const { handleSubmit, control } = useForm();
//   const [sportOpen, setsportOpen] = useState(false);
//   const [sportValue, setSportValue] = useState('');
//   const [sport, setSport] = useState([
//     { label: 'Netball', value: 'netball' },
//     { label: 'Soccer', value: 'soccer' },
//     { label: 'Football', value: 'football' },
//     { label: 'Basketball', value: 'basketball' },
//     { label: 'Baseball', value: 'baseball' },
//   ]);
//   const saveUserData = async (userData) => {
//     try {
//       const response = await axios.post(`${serverAddress}/api/athletes`, userData); // Save in Users collection
  
//       if (response.status === 201) {
//         console.log('User data saved successfully in Users collection');
//       } else {
//         console.error('Error while saving user data in Users collection:', response.data.error);
//         throw new Error('User data saving failed');
//       }
//     } catch (error) {
//       console.error('Error while saving user data in Users collection:', error.message);
//       throw error;
//     }
//   };
  
//   const saveCoachData = async (coachData) => {
//     try {
//       const response = await axios.post(`${serverAddress}/api/coach`, coachData); // Save in Coach collection
  
//       if (response.status === 201) {
//         console.log('Coach data saved successfully in Coach collection');
//       } else {
//         console.error('Error while saving coach data in Coach collection:', response.data.error);
//         throw new Error('Coach data saving failed');
//       }
//     } catch (error) {
//       console.error('Error while saving coach data in Coach collection:', error.message);
//       throw error;
//     }
//   };
  

//   const onSportOpen = useCallback(() => {}, []);
//   const [newSport, setNewSport] = useState(''); 
//   const serverAddress = 'http://localhost:3000';
//   const handleSignUp = async () => {
//     try {
//       const userData = {
//         username,
//         password,
//         email,
//         team,
//         phoneNum,
//         sport: sportValue === 'other' ? newSport : sportValue,
//       };
          
//       // Save data in User collection
//       const userResponse = await saveUserData(userData);
  
//       // Save data in Coach collection
//       const coachResponse = await saveCoachData(userData);

  
//       if (userResponse.status === 201 && coachResponse.status === 201) {
//         console.log('User registered successfully');
//         alert('Welcome to Athlete Insight!');
    
//         navigation.navigate('MainCoach', {
//                 screen: 'LoginCoach'
//               })
//       } else {
//         console.error('Error during registration:', userResponse.data.error);
//         setError('Registration Failed\n' + userResponse.data.error);
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.message);
//       setError('Registration Failed\nSomething went wrong with the registration process.');
//     }
//   };
  
  
//   const handleEmail = (e) => {
//     setEmail(e.target.value);
//     const regex = /^[a-zA-Z0-9]+@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

//     if (regex.test(e.target.value)) {
//       setEmailValid(true);
//     } else {
//       setEmailValid(false);
//     }
//   };

//   function navLogin(e) { 
//     navigation.navigate('MainCoach', {
//             screen: 'LoginCoach'
//           })
//   }

//   return (
//     <View style={signupStyle.container}>
//       <Text style={signupStyle.headerText}>HELLO COACH</Text>
//       <View style={signupStyle.textInputContainer}>
//         <TextInput
//           style={signupStyle.inputBox}
//           value={username}
//           placeholder="Username"
//           onChangeText={setUsername}
//         />
//         <TextInput
//           style={signupStyle.inputBox}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />
//         <TextInput
//           style={signupStyle.inputBox}
//           onChangeText={setEmail}
//           value={email}
//           placeholder="Email"
//           onChange={handleEmail}
//         />
//         <TextInput
//           style={signupStyle.inputBox}
//           placeholder="Team"
//           value={team}
//           onChangeText={setTeam}
//         />
//         <TextInput
//           style={signupStyle.inputBox}
//           placeholder="Phone Number"
//           value={phoneNum}
//           onChangeText={setPhoneNum}
//         />
//         <View style={signupStyle.dropdownSport}>
//           <DropDownPicker
//             dropDownDirection="TOP"
//             style={signupStyle.dropdown}
//             open={sportOpen}
//             value={sportValue}
//             items={[
//               ...sport,
//               { label: 'Other', value: 'other' }, // "Other" 옵션 추가
//             ]}
//             defaultValue={sportValue}
//             setOpen={setsportOpen}
//             setValue={setSportValue}
//             setItems={setSport}
//             placeholder="Select Sport"
//             placeholderStyle={signupStyle.placeholderStyles}
//             activityIndicatorColor="#5188E3"
//             searchable={true}
//             searchPlaceholder="Search your sport here..."
//             onOpen={onSportOpen}
//             onchangeItem={(item) => setSportValue(item.value)}
//           />
//         </View>
//         {sportValue === 'other' && ( 
//           <TextInput
//             style={signupStyle.inputBox}
//             placeholder="Enter Your Sport"
//             value={newSport}
//             onChangeText={setNewSport}

//           />
//         )}
//         <TouchableOpacity onPress={handleSignUp} style={signupStyle.loginButton}>
//           <Text style={{ color: 'white' }}>Sign Up</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={navLogin}>
//           <Text style={signupStyle.links}> Already have an account? </Text>
//         </TouchableOpacity>
//       </View>
//       {error && <Text style={{ color: 'red', fontWeight: 700 }}> {error}</Text>}
//     </View>
//   );
// }

// const signupStyle = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#033b64',
//   },
//   textInputContainer: {
//     width: '100%',
//     alignItems: 'center',
//     gap: 10,
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 40,
//     color: 'white',
//   },
//   inputBox: {
//     borderRadius: 5,
//     backgroundColor: '#F2F2F2',
//     width: '70%',
//     height: 40,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     fontSize: 16,
//   },
//   loginButton: {
//     borderRadius: 5,
//     backgroundColor: 'black',
//     width: '70%',
//     height: 40,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     fontSize: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   dropdownSport: {
//     width: '75%',
//     height: 30,
//     paddingHorizontal: 10,
//     paddingVertical: 2,
//     fontSize: 16,
//     marginBottom: 25,
//   },
//   dropdown: {
//     borderColor: '#B7B7B7',
//     height: 50,
//   },
//   placeholderStyles: {
//     color: 'grey',
//   },
//   links: {
//     textAlign: 'center',
//     textDecorationLine: 'underline',
//     color: '#758580',
//   },
// });


