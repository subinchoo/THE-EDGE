import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import PDFView from 'react-native-view-pdf';


const WellbeingHistory = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf", 
      });

      if (result.type === "success") {
        setSelectedFile(result);
        console.log(
          "Selected File:",
          result.uri,
          result.type,
          result.name,
          result.size
        );
      } else {
        console.log("File selection cancelled.");
      }
    } catch (err) {
      console.error("File selection error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectFile} style={styles.selectButton}>
        <Text style={styles.buttonText}>Select File</Text>
      </TouchableOpacity>

      {selectedFile && (
        <View style={styles.pdfContainer}>
          <PDFView
            fadeInDuration={250.0}
            style={{ flex: 1 }}
            resource={selectedFile.uri}
            resourceType={"url"}
            onLoad={() => console.log(`PDF rendered from ${selectedFile.uri}`)}
            onError={(error) => console.log(`Error rendering PDF: ${error}`)}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectButton: {
    backgroundColor: "#023B64",
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  pdfContainer: {
    flex: 1,
    width: "100%",
  },
  buttonText: {
    color: "#B69B68",
    fontSize: 18,
    textAlign: "center",
  },
});

export default WellbeingHistory;
