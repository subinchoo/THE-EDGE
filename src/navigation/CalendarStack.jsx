import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "../pages/CalendarScreen";

const Stack = createNativeStackNavigator();

function CalendarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

export default CalendarStack;
