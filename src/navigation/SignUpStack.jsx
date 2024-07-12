import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../pages/SignUp';
import TabNavigation from './TabNavigation';

const Stack = createNativeStackNavigator();

function SignUpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Main" component={TabNavigation} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default SignUpStack;