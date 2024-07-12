import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
const ImageSelection = ({ isVisible, onClose, onSelectImage }) => {
  const [image, setImage] = useState(null);

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0]; // assets 배열에서 첫 번째 이미지 선택
      setImage(selectedAsset.uri);
      onSelectImage(selectedAsset.uri);
    }
  };

  const handleCameraCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const selectedAsset = result.assets[0]; // assets 배열에서 첫 번째 이미지 선택
      setImage(selectedAsset.uri);
      onSelectImage(selectedAsset.uri);
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={handleImageSelection}>
            <Text style={styles.selectorFont}>Photo / Video</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectorContainer}>
          <TouchableOpacity onPress={handleCameraCapture}>
            <Text style={styles.selectorFont}>Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#023B64",
    position: 'absolute',
    width: "100%",
    height: 200,
    bottom: 0,
    borderRadius: 20,
    
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginVertical: 16,
  },
  selectorContainer: {
    height: 30,
    margin: 10,
  },
  selectorFont: {
    fontSize: 18,
    fontWeight: 400,
    color: 'white',
  },
  cancelButtonContainer: {
    position: 'absolute',
    top: 20, 
    right: 20, 
  },
  cancelButton: {
    fontSize: 18,
    color: '#D4282F',
  },
});

export default ImageSelection;
