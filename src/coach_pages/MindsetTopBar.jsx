import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated } from "react-native";

const MindsetTopBar = ({ onHeightChange, onCancelNewPost, onNewPost }) => {
  const [isDragging, setIsDragging] = useState(false);
  const topBarHeight = useRef(new Animated.Value(60)).current;

  const handleStartShouldSetResponderCapture = () => {
    if (topBarHeight >= 40) {
      setIsDragging(true);
      return true;
    }
    return false;
  };

  const handleMoveShouldSetResponderCapture = () => {
    return true;
  };

  const handleResponderMove = (event, gestureState) => {
    const newHeight = 60 + gestureState.dy;
    if (newHeight >= 60) {
      topBarHeight.setValue(newHeight);
      onHeightChange(newHeight);
    }
  };

  const handleResponderRelease = () => {
    setIsDragging(false);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          { height: topBarHeight },
          isDragging && styles.dragging,
        ]}
        onStartShouldSetResponderCapture={handleStartShouldSetResponderCapture}
        onMoveShouldSetResponderCapture={handleMoveShouldSetResponderCapture}
        onResponderMove={handleResponderMove}
        onResponderRelease={handleResponderRelease}
      >
        <TouchableOpacity onPress={onCancelNewPost}>
          <Text style={styles.cancelButton}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>MindSet</Text>
        <TouchableOpacity onPress={onNewPost}>
          <Text style={styles.newPostButton}>New Post</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#023B64",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  animatedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dragging: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    backgroundColor: "#023B64",
  },
  cancelButton: {
    fontSize: 16,
    color: "#D4282F",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  newPostButton: {
    fontSize: 16,
    color: "white",
  },
});

export default MindsetTopBar;
