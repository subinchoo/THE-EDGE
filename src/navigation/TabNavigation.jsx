import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "./HomeStack";
import GoalStack from "./GoalStack";
import NoteStack from "./NoteStack";
import SocialStack from "./SocialStack";
import CalendarStack from "./CalendarStack";
import LoginStack from "./LoginStack";
import SignUpScreen from "../pages/SignUp";
import LoginScreenCoach from "../coach_pages/LoginCoach";
import SignUpScreenCoach from "../coach_pages/SignUpCoach";
import StudioScreenCoach from "../coach_pages/StudioScreenCoach";
import MindHistory from "../coach_pages/MindHistory";
import AuthenticationComponent from '../FInxS_Pages/FinxS_SignInAuth';
import CheckPasswordStatusComponent from '../FinxS_Password/checkPassword';
import AuthenticationAndCheckPasswordStatusComponent from '../FinxS_Password/checkMultiplePassword';
import { Image } from "react-native";
import FormScreen from '../FInxS_Pages/FinxS_Main';
import WellbeingStack from './WellbeingStack';
import WellbeingHistory from '../pages/WellbeingHistory';
import ProfileScreen from '../Profile';
import SettingsScreen from '../setting_pages/SettingScreen';
import RegisterationScreen from '../pages/RegisterationScreen';
import RegistrationStack from './RegistrationStack';
import PerformanceCoach from '../coach_pages/CoachPerformanceScreen';
import CoachPerformanceScreen from '../coach_pages/CoachPerformanceScreen';
import Mindset from '../pages/MindsetScreen';
import LoginScreen from '../pages/Login';



const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function TabNavigation() {
  return (

    <Tab.Navigator
      initialRouteName="Home" 
      screenOptions={{
        tabBarStyle: { backgroundColor: "#023B64", height: 100 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#999",
      }}
    >
      {/* <Tab.Screen
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
      /> */}

      <Tab.Screen
        name="Goal"
        component={GoalStack}
        options={{

          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../Images/Goal_Runningman.png")
                  : require("../Images/Goal_Runningman.png")
              }
              style={{ width: 30, height: 28 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Note"
        component={NoteStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../Images/notes.png")
                  : require("../Images/notes.png")
              }
              style={{ width: 30, height: 28 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../Images/Home.png")
                  : require("../Images/Home.png")
              }
              style={{ width: 30, height: 35 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialStack}
        options={{

          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../Images/social.png")
                  : require("../Images/social.png")
              }
              style={{ width: 30, height: 28 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarStack}
        options={{
          tabBarVisible: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("../Images/calendar.png")
                  : require("../Images/calendar.png")
              }
              style={{ width: 30, height: 28 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: true,
        }}
      />
      <Tab.Screen
        name="Registration"
        component={RegisterationScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Mindset"
        component={Mindset}
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
      {/* <Tab.Screen
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
       <Tab.Screen
        name="Mindset"
        component={Mindset}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }}
      />
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
          headerShown: true,
        }}
      /> */}
      <Tab.Screen
        name="FinxSSignUp"
        component={AuthenticationComponent}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }} />
      <Tab.Screen
        name="FinxSPasswordCheck"
        component={CheckPasswordStatusComponent}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }} />
      <Tab.Screen
        name="FinxSMultiPasswordCheck"
        component={AuthenticationAndCheckPasswordStatusComponent}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }} />
      <Tab.Screen
        name="FinxSMain"
        component={FormScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
          headerShown: false,
        }} />
    </Tab.Navigator>

  );
}
