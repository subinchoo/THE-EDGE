import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SocialScreen from "../pages/SocialScreen";
const Stack = createNativeStackNavigator();

function SocialStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SocialScreen" component={SocialScreen} 
      options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default SocialStack;
