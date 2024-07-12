import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const MindsetScroll = ({ onSelectEmotion }) => {
  const emotions = [
    { key: 0, label: "Good" },
    { key: 1, label: "NotGood" },
    { key: 2, label: "Happy" },
    { key: 3, label: "SoSo" },
    { key: 4, label: "Bad" },
  ];

  const emotionImages = {
    Good: require("../Images/Mindset_Good.png"),
    NotGood: require("../Images/Mindset_NotGood.png"),
    Happy: require("../Images/Mindset_Happy.png"),
    SoSo: require("../Images/Mindset_SoSo.png"),
    Bad: require("../Images/Mindset_Bad.png"),
  };

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  useEffect(() => {
    onSelectEmotion(selectedEmotion);
  }, [selectedEmotion]);

  const renderEmotionOptions = () => {
    return emotions.map((emotion) => (
      <TouchableOpacity
        key={emotion.key}
        style={styles.emotionOption}
        onPress={() => setSelectedEmotion(emotion.label)}
      >
        <View style={styles.emotionOptionContainer}>
          <Image
            source={emotionImages[emotion.label]}
            style={styles.emotionImage}
          />
          <Text style={styles.emotionOptionText}>{emotion.label}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.emotionOptionsContainer}>
        {renderEmotionOptions()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    alignItems: "center",
    paddingTop: 30,
  },
  selectedEmotionImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  emotionOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    backgroundColor: "#023B64",
  },
  emotionOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  emotionOptionContainer: {
    alignItems: "center",
  },
  emotionImage: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  emotionOptionText: {
    fontSize: 16,
    color: "#B69B68",
  },
});

export default MindsetScroll;
