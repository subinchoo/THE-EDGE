import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Post from '../components/PerformancePost';
import PerformanceNewPost from '../components/PerfomanceNewPost';

const LogoImage = require('../Images/logo.png');

const CoachPerformanceScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostData, setNewPostData] = useState(null);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  const handlePostCreation = async (selectedTeamMember, selectedImage, content) => {
    const newPost = {
      username: selectedTeamMember,
      date: new Date().toISOString(),
      performanceImg: selectedImage,
      performanceContent: content,
    };

    try {
      const response = await fetch("http://localhost:3000/api/Performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (response.status === 201) {
        const message = await response.json();
        setNewPostData(message);
      } else {
        console.error("Failed to create performance post");
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

  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Post
        name={item.username}
        date={formatDate(item.date)}
        image={item.performanceImg}
        content={item.performanceContent}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('StudioScreenCoach');
        }}
      >
        <Image source={LogoImage} style={styles.logoImage} />
      </TouchableOpacity>
      <View style={styles.contentContainer}>
        {!isCreatingPost ? (
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id ? item._id.$_id : null}
            renderItem={renderPostItem}
          />
        ) : (
          <PerformanceNewPost
            onCancel={handleCancelNewPost}
            onSave={handlePostCreation}
          />
        )}
      </View>

      <TouchableOpacity style={styles.newPostButton} onPress={handleNewPost}>
        <Text style={{ color: 'white' }}>New Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  logoImage: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 70,
  },
  newPostButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#033b64',
    padding: 12,
    borderRadius: 5,
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
  },
});

export default CoachPerformanceScreen;
