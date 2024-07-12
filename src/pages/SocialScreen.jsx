import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ImageSelection from '../components/ImageSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SocialScreen() {
  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState(null);
  const [userData, setUserData] = useState({ username: '', team: '' });
  const [posts, setPosts] = useState([]);
  const [isImageSelectionVisible, setImageSelectionVisible] = useState(false);

  const handlePost = () => {
    if (postText || postImage) {
      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

      const newPost = {
        id: new Date().getTime(),
        username: userData.username,
        team: userData.team,
        date: currentDate,
        text: postText,
        image: postImage,
      };

      setPosts([newPost, ...posts]);

      // Reset input fields after posting
      setPostText('');
      setPostImage(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const team = await AsyncStorage.getItem('team');
        console.log('Username:', username);
        console.log('Team:', team);
        setUserData({ username, team });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.teamText}>{userData.team}</Text>
        <Text style={styles.boldText}> {userData.username}</Text>
        <TextInput
          value={postText}
          onChangeText={(text) => setPostText(text)}
          placeholder="context"
          multiline={true}
          style={styles.postInput}
        />

        {postImage && (
          <Image source={{ uri: postImage }} style={styles.postImagePreview} />
        )}

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity onPress={() => setImageSelectionVisible(true)}>
            <Image
              source={require('../Images/ImageSelection_PhotoLibrary.png')}
              style={styles.postButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePost}>
            <Image source={require('../Images/Social_send.png')} style={styles.postButtonImage} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
  data={posts}
  keyExtractor={(item) => (item ? item.id.toString() : null)}
  renderItem={({ item }) => (
    <View style={styles.postItem}>
      {item && (
        <>
          <Text style={styles.postUsername}>{item.username}</Text>
          <Text style={styles.postDate}>{item.date}</Text>
          <Text style={styles.postText}>{item.text}</Text>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.postImage} />
          )}
        </>
      )}
    </View>
  )}
/>

<ImageSelection
  isVisible={isImageSelectionVisible} // isVisible prop을 설정
  onClose={() => setImageSelectionVisible(false)}
  onSelectImage={(imageUri) => {
    setPostImage(imageUri);
    setImageSelectionVisible(false);
  }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  teamText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    backgroundColor: '#87B3D1',
    borderRadius: 8,
    borderColor:'#B39E6A',
    borderWidth:3,
    padding: 16,
    marginBottom: 16,
  },
  postInput: {
    fontSize: 16,
    height: 120,
    marginBottom: 10,
  },
  postImagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 8,
  },
  iconButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postButtonImage: {
    width: 30,
    height: 30,
    tintColor: '#023B64',
  },
  postItem: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderColor:'#B39E6A',
    borderWidth:3,
  },
  postUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  postText: {
    fontSize: 16,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
