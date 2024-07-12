
import * as React from 'react';
import { View, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { Div, ThemeProvider, Text, Button, Icon, Image } from 'react-native-magnus';
import { Linking } from 'react-native';


export default function RegisterationScreen({ navigation }) {

  function onRegistration(e) {
    // navigation.navigate('RegistrationScreen');
    navigation.navigate('Main', {
      screen: 'SignUp'
    });
  } 
  
  function onRegistrationCoach(e) {
    navigation.navigate('MainCoach', {
      screen: 'SignUpCoach'
    });
  }

  function moveLogin(e){
    // navigation.navigate('Main', {
    //   screen:'Login'
    // });
    navigation.navigate('LoginScreen');
  }

  return (
    
    <View style={registerStyle.container}>
      {/* <Text style={registerStyle.headerText}>ATHLETE INSIGHT</Text> */}
      <Image
        source={require('../Images/logo.png')} 
        style={registerStyle.logo} 
      />
      <ThemeProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Div row>
            <Button
              color="white"
              bg="#033b64"
              h={130} w={130}
              alignItems='center'
              rounded="circle"
              ml="md"
              borderWidth={5}
              borderColor='#b49e6a'
              onPress={onRegistrationCoach}
              right={30}
              fontSize={20}
              fontWeight='bold'

            >
              COACH
            </Button>

            <Button
              color="white"
              bg="#033b64"
              h={130} w={130}
              rounded="circle"
              ml="md"
              borderWidth={5}
              borderColor='#b49e6a'
              onPress={onRegistration}
              left={10}
              fontSize={20}
              fontWeight='bold'

            >
              ATHLETE
            </Button>

          </Div>
          <Div row>
            <Button
              color="white"
              bg="#033b64"
              h={130} w={130}
              rounded="circle"
              ml="md"
              borderWidth={5}
              borderColor='#b49e6a'
              marginTop={40}
              right={30}
              fontSize={20}
              fontWeight='bold'

            >
              PARENT
            </Button>
            <Button
              color="white"
              bg="#033b64"
              h={130} w={130}
              rounded="circle"
              ml="md"
              borderWidth={5}
              borderColor='#b49e6a'
              marginTop={40}
              left={10}
              fontSize={20} 
              fontWeight='bold'
            >
              CLUB
            </Button>
          </Div>
          <Div
            mx="xl"
            alignItems="center"
            justifyContent="center"
            flexDir="row"
            mt="xl"
          >
            <View
              style={{
                padding: 15,
                backgroundColor: "#033b64",
                borderRadius: 555, // Large value for perfect circle
                marginRight: 10, // Adjust spacing
                marginTop:20,
                borderColor:'#b49e6a'


              }}
            >
              <Button
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                rounded="circle"
                // borderColor="#b49e6a"
                bg="#b49e6a"
                color="white"
                onPress={() => {
                  Linking.openURL('https://www.facebook.com');
                }}
              >
                <Icon name="facebook-square" size={40} color="black" />
              </Button>
                </View>
              <View
                style={{
                  padding: 15,
                  backgroundColor: "#033b64",
                  borderRadius: 555, // Large value for perfect circle
                  marginLeft: 20, // Adjust spacing
                  marginTop:20,


                }}
              >
                <Button
                  flexDirection="row"
                  rounded="circle"
                  // borderColor="#033b64"
                  bg="#b49e6a"
                  color="white"
                  onPress={() => {
                    Linking.openURL('https://www.instagram.com'); // Change the URL to your Instagram page
                  }}    >
                  <Icon name="instagram" size={80} color="black" />
                </Button>
              </View>

          </Div>
          <Div
            mx="xl"
            alignItems="center"
            justifyContent="center"
            flexDir="row"
            mt="xl"
            marginTop='10'
          >
            <Text style={registerStyle.links} onPress={moveLogin}>
              Already have account ?
            </Text>
          </Div>
        </SafeAreaView>
      </ThemeProvider>
    </View >
  );
}



const regiBtnStyles = StyleSheet.create({
  athleteBtn: {
    color: "white",
    backgroundColor: "#b49e6a",
    width: 130,
    height: 130,
    borderWidth: 3,
    borderColor: 'grey',

  }
})

const registerStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  // headerText: {
  //   fontWeight: "bold",
  //   fontSize: 40,
  //   color: "white",
  //   marginTop: 200,
  //   marginBottom: 30
  // },
  links: {
    textAlign: "center",
    textDecorationLine: "underline",
    color: "#758580",
    marginTop:40
  },
  logo: {
    width: 250, 
    height: 250, 
    resizeMode: 'contain', 
    marginBottom: 20,
    marginTop:30
  },



})
