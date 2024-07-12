import { View, Text, StyleSheet, Image } from "react-native";

const Post = ({ name, date, image, title, content }) => {
    return (
      <View>
        <Text style={post_styles.nameText}>{name}</Text>
        <Text>{date}</Text>
        {image && (
          <Image
            source={image} 
            style={{ width: 200, height: 200, resizeMode: 'cover', alignSelf:'center' }}
          />
        )}
        <Text>{title}</Text>
        <Text>{content}</Text>
      </View>
    );
  };
  
const post_styles = StyleSheet.create({
nameText: {
    fontSize: 16,
    color: "#419C99",
    fontWeight: "bold"
  },
  dateText: {

  },
  contentText: {

  },
  commentText: {

  }
})
export default Post;