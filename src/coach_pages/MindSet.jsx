import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Post from "./MindsetPost";
import MindsetNewPost from "./MindsetNewPost";
import MindsetScroll from "./MindsetScroll";
import MindsetTopBar from "./MindsetTopBar";

const MindSet = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [newPostData, setNewPostData] = useState(null);

  const handleNewPost = () => {
    setIsCreatingPost(true);
  };

  const handleCancelNewPost = () => {
    setIsCreatingPost(false);
  };

  const handlePostCreation = async (selectedEmotion, selectedImage, content) => {
    const formData = new FormData();
    formData.append("emotion", selectedEmotion);
    formData.append("mindsetImg", selectedImage);
    formData.append("mindsetContent", content);

    try {
      const response = await fetch("http://localhost:3000/api/Mindset", {
        method: "POST",
        body: formData,
      });

      if (response.status === 201) {
        const newPostData = await response.json();
        setNewPostData(newPostData);
      } else {
        console.error("Failed to create mindset post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (newPostData) {
      setPosts((prevPosts) => [newPostData, ...prevPosts]);
      setNewPostData(null);
    }
  }, [newPostData]);

  const handleSelectEmotion = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const getFilteredPosts = () => {
    return posts.filter((post) => {
      if (!selectedEmotion || selectedEmotion === "Select Emotion") {
        return true;
      }
      return post.emotion === selectedEmotion;
    });
  };

  const filteredPosts = getFilteredPosts();

  const handleDeletePost = (id) => {
    const response = fetch(`http://localhost:3000/api/Mindset/${id.$_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }

        const updatedPosts = posts.filter((post) => post._id.$_id !== id.$_id);
        setPosts(updatedPosts);
      })
      .catch((error) => {
        console.error("Error deleting post: ", error);
      });
  };

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Post
        name={item.emotion}
        date={formatDate(item.date)}
        image={item.mindsetImg}
        content={item.mindsetContent}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePost(item._id)}
      >
        <Text style={{ color: "red" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <MindsetTopBar onGoBack={() => navigation.navigate("StudioScreenCoach")} />
      {!isCreatingPost && <MindsetScroll onSelectEmotion={handleSelectEmotion} />}
      {!isCreatingPost ? (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item._id.$_id}
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
    </View>
  );
};

export default MindSet;
