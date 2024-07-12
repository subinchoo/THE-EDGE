import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../pages/Login";
import TabNavigation from "./TabNavigation";

const Stack = createNativeStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
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

export default LoginStack;
