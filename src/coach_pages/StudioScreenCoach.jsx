import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";



export default function StudioScreenCoach({ navigation }) {


  return (
    <View style={ScreenStyle.container}>
      <TouchableOpacity

       onPress={()=>   
        navigation.navigate('Main', {
        screen: 'Registration'})}
        
        >
      <Image
    source={require("../Images/logo.png")} 
    style={logoStyle.logo} 
  />
  </TouchableOpacity>
      <Text style={ContentsStyles.titleText}> Team </Text>
      <TouchableOpacity style={StudioBtnStyle.Button_Team}>
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Team
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={StudioBtnStyle.Button_Calender}
        >
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            Calender
          </Text>
        </TouchableOpacity>
      <ScrollView style={{ width: "100%" }}>
        
        <Text style={ContentsStyles.titleText}> New Post</Text>

        <View style={StudioBtnStyle.PostContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MindHistory")}
            style={StudioBtnStyle.Button_mindset}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Mindset
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PerformanceCoach")}
            style={StudioBtnStyle.Button_performance}
          >
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Performance
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Wellbeing")}
          style={StudioBtnStyle.Button_wellbeing}
        >
          <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
            Wellbeing
          </Text>
        </TouchableOpacity>

        <View style={StudioBtnStyle.PostContainer}>
          <TouchableOpacity 
           onPress={() => navigation.navigate("MindHistory")}
          style={StudioBtnStyle.Button_social}>
            <Text 
           
            style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              Social
            </Text>
          </TouchableOpacity>

         
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Represents a note.
 * @param {username} username
 * @param {date} date - The date the note was created.
 * @param {string} content - The mindset contents.
 */
function MainCoach({ username, date, content }) {
  const displayDate = date ? date.toLocaleDateString() : "";
  return (
    <View style={{ marginBottom: 5 }}>
      <View style={ContentsStyles.container}>
        <Text style={ContentsStyles.usernameText}>{username}</Text>
        <Text style={ContentsStyles.contentText}>{displayDate}</Text>
        <Text style={ContentsStyles.contentText}>{content}</Text>
      </View>
    </View>
  );
}

const ScreenStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    gap: 20,
    marginTop: 60,
  },
});

const ContentsStyles = StyleSheet.create({
  container: {
    gap: 5,
    padding: 10,
    width: "100%",
    borderWidth: 2,
    borderColor: "#B39E6A",
    backgroundColor: "#033b64",
    borderRadius: 5,
  },
  usernameText: {
    fontSize: 18,
    color: "#419C99",
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 13,
    color: "white",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
    marginTop: 10,
  },
});

const logoStyle = StyleSheet.create({
  logo: {
    width: 200, 
    height: 80, 
    resizeMode: "contain", 
  },
});


const StudioBtnStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    gap: 10,
  },
  PostContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom:10
  },
  Button_mindset: {
    borderRadius: 5,
    backgroundColor: "#A8DADC",
    width: "50%",
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  Button_performance: {
    borderRadius: 5,
    backgroundColor: "#E48F92",
    width: "50%",
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  Button_wellbeing: {
    borderRadius: 5,
    backgroundColor: "#279B5C",
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom:10
  },
  Button_Calender: {
    borderRadius: 5,
    backgroundColor: "#87B3D1",
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom:10
  },
  Button_social: {
    borderRadius: 5,
    backgroundColor: "#B39E6A",
    width: "100%",
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom:10
  },
  Button_studio: {
    borderWidth: 3,
    borderColor: "#B39E6A",
    borderRadius: 5,
    backgroundColor: "white",
    width: "47%",
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  Button_Team: {
    borderRadius: 5,
    backgroundColor: "#457B9D",
    width: "47%",
    height: 120,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  footer: {
    width: "100%",
    height: "135%",
    justifyContent: "center",
    alignItems: "center",
  },
});
