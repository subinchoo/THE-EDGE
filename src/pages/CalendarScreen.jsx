import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    updateMarkedDates();
  }, [events]);

  const onDateChange = (day) => {
    setSelectedDate(day.dateString);
  };

  const addEvent = () => {
    if (!eventText) {
      Alert.alert("Warning", "Please input content");
      return;
    }

    const newEvent = {
      date: selectedDate,
      text: eventText,
      checked: false,
    };

    setEvents((prevEvents) => ({
      ...prevEvents,
      [selectedDate]: [...(prevEvents[selectedDate] || []), newEvent],
    }));

    setEventText("");
  };

  const toggleEventCheck = (date, index) => {
    const updatedEvents = { ...events };
    updatedEvents[date][index].checked = !updatedEvents[date][index].checked;
    setEvents(updatedEvents);
  };

  const deleteEvent = (date, index) => {
    Alert.alert(
      "Confirm",
      "Do you want to delete",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            const updatedEvents = { ...events };
            updatedEvents[date].splice(index, 1);
            setEvents(updatedEvents);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateMarkedDates = () => {
    const marked = {};
    Object.keys(events).forEach((date) => {
      marked[date] = { marked: true };
    });
    setMarkedDates(marked);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.eventItem}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleEventCheck(selectedDate, index)}
      >
        {item.checked ? (
          <Text style={styles.checked}>✓</Text>
        ) : (
          <Text style={styles.unchecked}> </Text>
        )}
      </TouchableOpacity>
      <Text style={styles.eventText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEvent(selectedDate, index)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar onDayPress={onDateChange} markedDates={markedDates} />

      <View style={styles.eventInputContainer}>
        <TextInput
          style={styles.eventInput}
          placeholder="Add event"
          value={eventText}
          onChangeText={(text) => setEventText(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={addEvent}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events[selectedDate] || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  eventInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  eventInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#457B9D",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  checked: {
    color: "#007bff",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
  },
  unchecked: {
    fontSize: 20,
  },
  eventText: {
    flex: 1,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "#D73E3F",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
