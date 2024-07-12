import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Post from './MindsetPost';
import MindsetNewPost from './MindsetNewPost';
import MindsetScroll from './MindsetScroll';

const MindHistory = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null); // 선택한 이모션 상태 추가
  const [newPostData, setNewPostData] = useState(null); // 새로운 게시물 데이터를 저장하는 상태

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleNewPost = () => {
    setIsCreatingPost(true);
  };

  const handleCancelNewPost = () => {
    setIsCreatingPost(false);
  };

  const addNewPostToTop = (newPost, existingPosts) => {
    return [newPost, ...existingPosts];
  };

  const handlePostCreation = (selectedEmotion, selectedImage, content) => {
    const newPost = {
      id: String(posts.length + 1),
      emotion: selectedEmotion,
      date: new Date().toISOString(),
      image: selectedImage,
      content: content,
    };

    const updatedPosts = addNewPostToTop(newPost, posts);

    setPosts(updatedPosts);
    setIsCreatingPost(false);
  };

  useEffect(() => {
    if (newPostData) {
      setPosts((prevPosts) => [...prevPosts, newPostData]);
      setNewPostData(null);
    }
  }, [newPostData]);

  // MindsetScroll에서 선택한 이모션을 업데이트하는 함수
  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
    console.log(emotion);
  };

  // 선택한 이모션에 따라 게시물을 필터링
  const getFilteredPosts = () => {
    return posts.filter((post) => {
      if (!selectedEmotion || selectedEmotion === "Select Emotion") {
        return false; // 선택하지 않았거나 "Select Emotion"인 경우 모든 포스트를 반환
      }
      return post.emotion === selectedEmotion; // 선택한 이모션에 따라 필터링
    });
  };

  const filteredPosts = getFilteredPosts(); // 필터링된 포스트 목록

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Post
        name={item.emotion}
        date={formatDate(item.date)}
        image={item.image}
        content={item.content}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {!isCreatingPost && (
        <MindsetScroll onSelectEmotion={handleSelectEmotion} />
      )}
      {!isCreatingPost ? (
        <FlatList
          data={filteredPosts} /* 필터링된 포스트 목록을 사용 */
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
        />
      ) : (
        <MindsetNewPost
          onCancel={handleCancelNewPost}
          onSave={handlePostCreation}
        />
      )}
      {!isCreatingPost && (
        <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
          <Text style={{ color: "white" }}>New Post</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.navigate("StudioScreenCoach");
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 24,
            fontWeight: "bold",
            top: 20,
            left: 20,
          }}
        >
          {"<"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
    backgroundColor: "white",
  },
  newPostButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#033b64",
    padding: 12,
    borderRadius: 5,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
    marginTop: 30,
  },
  postImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 8,
  },
  goBackButton: {
    position: "absolute",
    top: -10,
    left: 0,
    fontWeight: "bold",
  },
  text: {
    fontFamily: "Montserrat-Black.ttf",
  },
});

export default MindHistory;
