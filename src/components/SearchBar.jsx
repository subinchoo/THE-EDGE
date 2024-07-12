import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch(text);
  };

  return (
    <View style={styles.skeleton}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
