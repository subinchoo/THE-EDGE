import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FloatingButton from "../components/NewUploadBtn";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const Studios = {
  Mindset: "Mindset",
  Wellbeing: "Wellbeing",
  Performance: "Performance",
};

export default function NoteScreen() {
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [notes, setNotes] = useState([]);

  const studios = Object.keys(Studios);
  const fetchNotes = () => {
    fetch("https://server-side-lavmca12v-gs-t.vercel.app/api/Notes")
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error fetching notes: ", error);
      });
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const saveNote = () => {
    const newNote = {
      date: new Date(),
      title: noteTitle,
      studio: selectedStudio,
      content: noteContent,
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);

    fetch("https://server-side-lavmca12v-gs-t.vercel.app/api/Notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Studio: selectedStudio,
        Title: noteTitle,
        Text: noteContent,
        Date_Written: new Date().toISOString(),
        Users: ["User1"],
        Author: "AuthorName",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("New note was created: ", responseData.message);
        setModalVisible(false);
        // fetchNotes();
      })
      .catch((error) => {
        console.error("error creating note: ", error);
      });
  };

  const deleteNote = (id) => {
    fetch(`https://server-side-lavmca12v-gs-t.vercel.app/api/Notes/${id}`, {
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

        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => {
        console.error("error deleting note: ", error);
      });
  };

  return (
    <SafeAreaView style={noteScreenStyles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <Text style={{ fontSize: 18, fontWeight: "bold" }}>New Note</Text>

              <TouchableOpacity
                onPress={() => {
                  saveNote(noteTitle, noteContent, selectedStudio);
                  setModalVisible(!modalVisible);
                }}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={modalStyles.noteInput}>
              <TextInput
                placeholder="Title"
                onChangeText={setNoteTitle}
                value={noteTitle}
                style={{
                  padding: 10,
                  marginBottom: 10,
                  fontWeight: "bold",
                  fontSize: 30,
                  textAlign: "center",
                }}
              />
              <TextInput
                placeholder="Content"
                onChangeText={setNoteContent}
                value={noteContent}
                style={{ padding: 10, height: 300 }}
                multiline={true}
              />
            </SafeAreaView>
          </View>
        </View>
      </Modal>

      <View style={studioSelectorStyles.container}>
        <ScrollView horizontal>
          {studios.map((studio) => (
            <View
              style={studioSelectorStyles.studioTitleContainer}
              key={studio}
            >
              <Text
                style={[
                  studioSelectorStyles.studioTitle,
                  {
                    fontWeight: studio === selectedStudio ? "bold" : "regular",
                  },
                ]}
                onPress={() => setSelectedStudio(studio)}
              >
                {studio}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={{ width: "100%" }}>
        {notes
          .filter((note) => note.studio === selectedStudio)
          .map((note) => (
            <View key={note.id} style={noteStyles.container}>
              <Text style={noteStyles.titleText}>{note.title}</Text>
              <Text style={noteStyles.dateText}>
                {note.date.toLocaleDateString()}
              </Text>
              <Text style={noteStyles.contentText}>{note.content}</Text>
              {/* <TouchableOpacity onPress={() => deleteNote(note._id)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => deleteNote(note._id)}>
                <Text style={{ color: "red" }}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>

      <FloatingButton colour="#A8DADC" onPress={() => setModalVisible(true)}>
        <AntDesignIcons name="plus" size={30} color="white" />
      </FloatingButton>
    </SafeAreaView>
  );
}

const noteScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

const noteStyles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  titleText: {
    fontWeight: "bold",
  },
  dateText: {
    color: "#555",
  },
  contentText: {
    marginTop: 10,
  },
});

const studioSelectorStyles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
  },
  studioTitleContainer: {
    paddingHorizontal: 25,
  },
  studioTitle: {
    fontWeight: "100",
    fontSize: 18,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 50,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  noteInput: {
    height: 700,
    width: 380,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#EDF7F7",
    borderColor: "#457b9d",
    borderRadius: 10,
  },
});
