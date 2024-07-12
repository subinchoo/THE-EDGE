import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import ImageSelection from '../components/ImageSelection';

const PerformanceNewPost = ({
    onCancel,
    onSave,
}) => {
    const teamMembers = ['Player 1', 'Player 2', 'Player 3'];
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);
    const [content, setContent] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isImageModalVisible, setImageModalVisible] = useState(false);

    const handleCancel = () => {
        onCancel();
        setSelectedTeamMember(null);
        setContent('');
        setSelectedImage(null);
        setImageModalVisible(false);
    };

    const handleUploadImage = () => {
        setImageModalVisible(true);
    };

    const handleImageSelection = (imageUri) => {
        setSelectedImage(imageUri);
        setImageModalVisible(false);
    };

    const handlePost = () => {
        onSave(selectedTeamMember, selectedImage, content);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleCancel}>
                    <Text style={{ fontSize: 16, color: '#D4282F' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost}>
                    <Text style={{ fontSize: 16, color: '#023B64' }}>Post</Text>
                </TouchableOpacity>

            </View>
            <Text style={styles.headerTitle}>New Post</Text>
            <ModalDropdown
                options={teamMembers}
                onSelect={(index, value) => setSelectedTeamMember(value)}
                defaultValue={selectedTeamMember || 'Select Team Member'}
                dropdownStyle={{ ...styles.selectUser, width: '80%' }}
                style={styles.selectUser}
                
            />

            <TextInput
                style={styles.input}
                placeholder="Enter your post content here"
                multiline
                value={content}
                onChangeText={(text) => setContent(text)}
            />

            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleUploadImage}>
                    <Text style={styles.imageBtn}>Upload Image</Text>
                </TouchableOpacity>
            </View>

            {isImageModalVisible && (
                <ImageSelection
                    isVisible={isImageModalVisible}
                    onClose={() => setImageModalVisible(false)}
                    onSelectImage={handleImageSelection}
                />
            )}
            {selectedImage && (
                <View>
                    <Image source={{ uri: selectedImage }} style={styles.image} />
                    <TouchableOpacity onPress={() => setSelectedImage(null)}>
                        <Text>Delete Image</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerTitle: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerBtn: {
        fontSize: 16,
        color: '#023B64',
    },
    selectUser: {
        borderWidth: 1, 
        borderColor: '#023B64', 
        padding:8,
        fontSize: 16,
        width:"100%",
    },

    imageContainer: {
        width: "100%",
        height: 30,
        alignItems: 'center',
        padding: 4,
        borderColor: '#023B64',
        borderWidth: 1,
        marginTop: 10
    },
    imageBtn: {
        color: "#B69B68"
    },
    input: {
        borderWidth: 1,
        borderColor: '#023B64',
        borderRadius: 5,
        padding: 12,
        marginTop: 8,
        minHeight: 250,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        resizeMode: 'cover',
    },
});

export default PerformanceNewPost;
