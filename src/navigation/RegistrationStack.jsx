import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import RegisterationScreen from '../pages/RegisterationScreen';
import Navigation from '../coach_pages/Navigation';

const Stack = createNativeStackNavigator();

function RegistrationStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="RegistrationScreen" component={RegisterationScreen} options={{ headerShown: false }} />
       <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} /> 
       <Stack.Screen name="MainCoach" component={Navigation} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default RegistrationStack;







// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import TabNavigation from './TabNavigation';
// import RegisterationScreen from '../pages/RegisterationScreen';
// import SignUpAthlete from '../pages/Athlete/SignUpAthlete';
// import SignUpCoach from '../pages/Coach/SignUpCoach';
// import SignUpParent from '../pages/Parent/SIgnUpParent';
// import SignUpClub from '../pages/Club/SignUpClub';

// import LoginScreen from '../pages/Login';
// const Stack = createNativeStackNavigator();

// function RegistrationStack() {
//   return (
//     <Stack.Navigator initialRouteName="RegistrationScreen">
//       <Stack.Screen name="RegistrationScreen" component={RegisterationScreen} options={{ headerShown: false }} />
//       <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} />
//       <Stack.Screen name="SignUpAthlete" component={SignUpAthlete} options={{ headerShown: false }} />
//       <Stack.Screen name="SignUpCoach" component={SignUpCoach}  options={{ headerShown: false }}/>
//       <Stack.Screen name="SignUpParent" component={SignUpParent} options={{ headerShown: false }} />
//       <Stack.Screen name="SignUpClub" component={SignUpClub} options={{ headerShown: false }}  />
//       <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} /> 
     
//     </Stack.Navigator>
//   );
// }

// export default RegistrationStack;
