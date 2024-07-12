import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Comment from '../components/Comment';
import PerformancePost from '../components/PerformancePost';

export default function AthletePerformanceScreen() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);


  // 클라이언트 측에서 성능 리뷰 포스트 목록 가져오기
useEffect(() => {
  async function fetchPerformancePosts() {
    try {
      const response = await fetch('http://localhost:3000/api/Performance');
      if (response.ok) {
        const data = await response.json();
        setPosts(data); // 서버에서 가져온 데이터를 posts 상태로 설정
      } else {
        console.error('Failed to fetch performance posts');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  fetchPerformancePosts();
}, []);

  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };


  const renderPostItem = ({ item }) => (
    <View style={performance_styles.posts}>
      <PerformancePost
       name={item.username}
       date={formatDate(item.date)}
       image={item.performanceImg}
       content={item.performanceContent}
      />
      {comments.map((comment, index) => (
        <Comment key={index} commentText={comment} />
      ))}
      <Comment onCommentSubmit={handleCommentSubmit} />
    </View>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={renderPostItem}
      style={performance_styles.container}
    />
  );
}

const performance_styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  posts: {
    marginTop: 15,
    marginHorizontal: 5,
    padding: 5,
    borderColor: '#023B64',
    borderWidth: 1,
    backgroundColor: 'white',
    marginBottom: 16,
  },
});
