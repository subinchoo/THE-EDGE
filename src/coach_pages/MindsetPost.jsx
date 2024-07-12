import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Post = ({ name, date, image, title, content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.dateText}>{date}</Text>
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10, 
    padding: 16,
    borderColor: "#ccc",
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
  },
  nameText: {
    fontSize: 16,
    color: "#419C99",
    fontWeight: "bold",
  },
  dateText: {
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },
  contentText: {},
});

export default Post;
