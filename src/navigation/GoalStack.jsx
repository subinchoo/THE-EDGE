import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoalScreen from "../pages/GoalScreen";

const Stack = createNativeStackNavigator();

function GoalStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoalScreen"
        component={GoalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default GoalStack;
