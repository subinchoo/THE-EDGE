import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/HomeScreen";
import MindsetScreen from "../pages/MindsetScreen";
import WellbeingScreen from "../pages/WellbeingScreen";
import PerformanceScreen from "../pages/AthletePerformanceScreen";
import AthletePerformanceScreen from '../pages/AthletePerformanceScreen';
import CoachPerformanceScreen from '../coach_pages/CoachPerformanceScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Mindset" component={MindsetScreen} />
      <Stack.Screen name="Wellbeing" component={WellbeingScreen} />
      <Stack.Screen name="Performance" component={PerformanceScreen} />
      {/* Athlete performancepage */}
      {/* <Stack.Screen name="Performance" component={AthletePerformanceScreen} /> */}
      
      {/* Coach performancepage */}
      {/* <Stack.Screen name="Performance" component={CoachPerformanceScreen} />  */}
       
    </Stack.Navigator>
  );
}

export default HomeStack;
