import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NoteScreen from "../pages/NoteScreen";
const Stack = createNativeStackNavigator();

function NoteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NoteScreen"
        component={NoteScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default NoteStack;
