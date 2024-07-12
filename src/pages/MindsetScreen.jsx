import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MindsetScroll from '../coach_pages/MindsetScroll';

const Mindset = ({ navigation }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
    console.log(emotion);
  };


  const fetchMindsetPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Mindset");
      if (response.status === 200) {
        const data = await response.json();
        setPosts(data); 
      } else {
        console.error("Failed to fetch mindset posts");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchMindsetPosts(); 
  }, []);

  const getFilteredPosts = () => {
    return posts.filter((post) => {
      if (!selectedEmotion || selectedEmotion === "Select Emotion") {
        return true; // 선택하지 않았거나 "Select Emotion"인 경우 모든 포스트를 반환
      }
      return post.emotion === selectedEmotion; // 선택한 이모션에 따라 필터링
    });
  };

  const filteredPosts = getFilteredPosts();

  return (
    <View style={styles.container}>
      <MindsetScroll onSelectEmotion={handleSelectEmotion} />

      <FlatList
        data={filteredPosts} // 필터링된 포스트 목록을 사용
        keyExtractor={(item) => item._id} // 포스트 아이디를 키로 사용
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* 게시물 내용을 렌더링하는 UI 코드 작성 */}
            <Text style={styles.postTitle}>{item.emotion}</Text>
            <Text style={styles.postDate}>{item.date}</Text>
            <Text style={styles.postContent}>{item.mindsetContent}</Text>
          </View>
        )}
      />

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
    borderRadius:10,
    marginBottom:-200
  },
  postContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 16,

    marginTop:20

  },
  postTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  postDate: {
    color: "gray",
    marginTop: 8,
  },
  postContent: {
    marginTop: 8,
  },
  goBackButton: {
    position: "absolute",
    top: -10,
    left: 0,
    fontWeight: "bold",
  },
});

export default Mindset;