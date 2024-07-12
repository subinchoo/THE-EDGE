import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Pressable, StyleSheet } from 'react-native';

const Comment = ({ postId, userId }) => {
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [isCommenting, setIsCommenting] = useState(false);

    useEffect(() => {
        setComments([]);
    }, []);

    const startCommenting = () => {
        setIsCommenting(true);
    };

    const formatCommentDate = (date) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    };

    const submitComment = () => {
        if (!commentText.trim()) {
            return;
        }

        if (editingCommentId) {
            const updatedComments = comments.map((comment) =>
                comment._id === editingCommentId
                    ? { ...comment, text: commentText }
                    : comment
            );
            setComments(updatedComments);
        } else {
            const newComment = {
                _id: String(Math.random()), // 임의의 고유 ID 생성 (실제에서는 백엔드에서 생성)
                userId,
                text: commentText,
                date: new Date().toISOString(), // 현재 날짜를 ISO 문자열로 저장
            };
            setComments([...comments, newComment]);
        }

        setCommentText('');
        setEditingCommentId(null);
        setIsCommenting(false);
    };

    const editComment = (commentId, commentText) => {
        setCommentText(commentText);
        setEditingCommentId(commentId);
    };

    const deleteComment = (commentId) => {
        // delete from mock data
        const updatedComments = comments.filter((comment) => comment._id !== commentId);
        setComments(updatedComments);
    };

    return (
        <View style={styles.container}>
            <View style={styles.commentInputContainer}>
                <TextInput
                    value={commentText}
                    onChangeText={(text) => setCommentText(text)}
                    placeholder={isCommenting ? "" : "Enter your comment here"}
                    style={{ flex: 1 }} // Input 영역이 남은 공간을 모두 차지하도록 flex 추가
                />
                <Pressable
                    onPress={submitComment}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'gray' : '#023B64',
                        },
                        styles.sendButton,
                    ]}
                >
                    <Text style={styles.buttonText}>{editingCommentId ? "Edit" : "Send"}</Text>
                </Pressable>
            </View>
            {editingCommentId && (
                <Pressable
                    onPress={() => setEditingCommentId(null)}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'gray' : '#023B64',
                        },
                        styles.button,
                    ]}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
            )}
            <FlatList
                data={comments}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.commentContainer}>




                        
                        <Text>{item.text}</Text>
                        <Text style={styles.commentDate}>{formatCommentDate(item.date)}</Text>
                        {item.userId === userId && (

                                <View style={styles.buttonContainer}>
                                    <Pressable
                                        onPress={() => editComment(item._id, item.text)}
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed ? 'gray' : '#023B64',
                                            },
                                            styles.editButton,
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>Edit</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => deleteComment(item._id)}
                                        style={({ pressed }) => [
                                            {
                                                backgroundColor: pressed ? 'gray' : 'red',
                                            },
                                            styles.deleteButton,
                                        ]}
                                    >
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </Pressable>
                                </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        width: '100%',
        borderColor: '#B69B68',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    sendButton: {
        alignItems: 'center',
        padding: 4,
        width: 53,
        borderRadius: 4,
        elevation: 3,
        alignSelf: 'flex-end',
        margin: 5,
    },
    commentContainer: {
        margin: 8,
        padding: 8,
        backgroundColor: 'white',
        borderRadius: 5,
        position: 'relative', // 부모 위치를 기준으로 자식의 위치 설정
    },
    buttonContainer: {
        position: 'absolute', // 상단 오른쪽에 배치하기 위해 절대 위치 설정
        top: 8, // 부모 상단에서 8px 아래로
        right: 8, // 부모 오른쪽에서 8px 왼쪽으로
        flexDirection: 'row', // 버튼을 수평으로 정렬
    },
    editButton: {
        backgroundColor: '#023B64',
        alignItems: 'center',
        padding: 4,
        width: 55,
        borderRadius: 4,
        elevation: 3,
        marginRight: 5, // Edit 버튼과 Delete 버튼 사이에 간격 설정
    },
    deleteButton: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 4,
        width: 55,
        borderRadius: 4,
        elevation: 3,
    },
    commentDate: {
        fontSize: 12,
        color: 'gray',
        margin: 3,
        // marginLeft: 'auto'
    },
    button: {
        alignItems: 'center',
        padding: 4,
        width: 55,
        borderRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
    },
});

export default Comment;