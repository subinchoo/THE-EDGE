import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreenCoach from '../coach_pages/SignUpCoach';

import Navigation from '../coach_pages/Navigation';
const Stack = createNativeStackNavigator();

function SignUpStackCoach() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUpCoach" component={SignUpScreenCoach} options={{ headerShown: false }} />
      <Stack.Screen name="MainCoach" component={Navigation} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default SignUpStackCoach;