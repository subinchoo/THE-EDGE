import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreenCoach from '../coach_pages/LoginCoach';
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

function LoginStackCoach() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreenCoach}
        options={{ headerShown: false ,
           tabBar: () => null,
           tabBarVisible: false,}}
        
      />
      {/* <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false ,
          tabBar: () => null,
          tabBarVisible: false,}}
      /> */}
    </Stack.Navigator>
  );
}

export default LoginStackCoach;
