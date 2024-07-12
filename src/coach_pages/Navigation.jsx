import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WellbeingHistory from '../pages/WellbeingHistory';
import WellbeingStack from '../navigation/WellbeingStack';
import LoginScreenCoach from './LoginCoach';
import SignUpScreenCoach from './SignUpCoach';

import MindHistory from './MindHistory';
import StudioScreenCoach from './StudioScreenCoach';
import CoachPerformanceScreen from './CoachPerformanceScreen';



const Tab = createBottomTabNavigator();

export default function Navigation(){
  return (
    <Tab.Navigator
      screenOptions={{
        // tabBarStyle: { backgroundColor: "#023B64", height: 100 },
      }}
    >
    <Tab.Screen
        name="Wellbeing"
        component={WellbeingStack}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="WellbeingHistory"
        component={WellbeingHistory}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />

<Tab.Screen
        name="LoginCoach"
        component={LoginScreenCoach}
        options={{
          tabBarButton: () => null,

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MindHistory"
        component={MindHistory}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
       {/* <Tab.Screen
        name="Mindset"
        component={Mindset}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="SignUpCoach"
        component={SignUpScreenCoach}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="StudioScreenCoach"
        component={StudioScreenCoach}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="PerformanceCoach"
        component={CoachPerformanceScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}