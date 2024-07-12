import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WellbeingHistory from "../pages/WellbeingHistory";
import WellbeingScreen from "../pages/WellbeingScreen";

const Stack = createStackNavigator();

const WellbeingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="WellbeingScreen" component={WellbeingScreen} />
    <Stack.Screen name="WellbeingHistory" component={WellbeingHistory} />
  </Stack.Navigator>
);

export default WellbeingStack;