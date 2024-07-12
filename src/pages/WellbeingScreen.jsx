import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

export default function DietTracker() {
  const navigation = useNavigation();
  const [selectedMeal, setSelectedMeal] = useState('meal1');
  const [food, setFood] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFats, setTotalFats] = useState(0);
  const [meals, setMeals] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());

  const handleAddMeal = () => {
    const parsedCarbs = parseFloat(carbs) || 0;
    const parsedProteins = parseFloat(proteins) || 0;
    const parsedFats = parseFloat(fats) || 0;

    const newMeal = { id: Date.now(), mealType: selectedMeal, food, carbs: parsedCarbs, proteins: parsedProteins, fats: parsedFats };
    setMeals([...meals, newMeal]);

    setTotalCarbs(totalCarbs + parsedCarbs);
    setTotalProteins(totalProteins + parsedProteins);
    setTotalFats(totalFats + parsedFats);

    setSelectedMeal('meal1');
    setFood('');
    setCarbs('');
    setProteins('');
    setFats('');
  };

  const handleDeleteMeal = (mealId) => {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId);
    setMeals(updatedMeals);

    let updatedTotalCarbs = 0;
    let updatedTotalProteins = 0;
    let updatedTotalFats = 0;

    updatedMeals.forEach((meal) => {
      updatedTotalCarbs += meal.carbs;
      updatedTotalProteins += meal.proteins;
      updatedTotalFats += meal.fats;
    });

    setTotalCarbs(updatedTotalCarbs);
    setTotalProteins(updatedTotalProteins);
    setTotalFats(updatedTotalFats);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Nutrition Diary</Text>
      <Text style={styles.mealTypeText}>{currentDate}</Text>
      <RNPickerSelect
        placeholder={{ label: 'Select Meal', value: null }}
        onValueChange={(value) => setSelectedMeal(value)}
        items={[
          { label: 'Meal 1', value: 'meal1' },
          { label: 'Meal 2', value: 'meal2' },
          { label: 'Meal 3', value: 'meal3' },
          { label: 'Meal 4', value: 'meal4' },
          { label: 'Snack', value: 'snack' },
        ]}
        style={{
          inputAndroid: styles.picker,
          inputIOS: styles.picker,
        }}
        value={selectedMeal}
      />
      <TextInput
        style={styles.input}
        placeholder="Food"
        onChangeText={setFood}
        value={food}
      />
      <TextInput
        style={styles.input}
        placeholder="Carbs (g)"
        onChangeText={setCarbs}
        value={carbs}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Proteins (g)"
        onChangeText={setProteins}
        value={proteins}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fats (g)"
        onChangeText={setFats}
        value={fats}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddMeal}
      >
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
      <View style={styles.totalStatsContainer}>
      <TouchableOpacity style={styles.totalStatButton}>
        <View style={styles.statRectangle_carb}>
          <Text style={styles.statLabel}>Carb</Text>
          <Text style={styles.statValue}>{totalCarbs.toFixed(2)}g</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.totalStatButton}>
        <View style={styles.statRectangle_protein}>
          <Text style={styles.statLabel}>Protein</Text>
          <Text style={styles.statValue}>{totalProteins.toFixed(2)}g</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.totalStatButton}>
        <View style={styles.statRectangle_fat}>
          <Text style={styles.statLabel}>Fat</Text>
          <Text style={styles.statValue}>{totalFats.toFixed(2)}g</Text>
        </View>
      </TouchableOpacity>
    </View>
    <Text style={styles.listText}>Meal List:</Text>
      <FlatList
        data={meals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.mealDetail}>
            <Text>Meal Type: {item.mealType}</Text>
            <Text>Food: {item.food}</Text>
            <Text>Carbs: {item.carbs.toFixed(2)}g</Text>
            <Text>Proteins: {item.proteins.toFixed(2)}g</Text>
            <Text>Fats: {item.fats.toFixed(2)}g</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteMeal(item.id)}
            >
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('WellbeingHistory')}
      >
        <Text style={styles.buttonText}>Upload My Health PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    // alignItems: 'center',


  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,

    marginLeft:120

  },
  mealTypeText: {
    fontSize: 18,
    marginBottom: 10,
    marginLeft:40
  },
  picker: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    marginLeft:40
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    marginLeft:40

  },
  button: {
    backgroundColor: '#023B64',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    marginLeft:40


  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  totalStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalStatButton: {
    flex: 1,
  },
  statRectangle_carb: {
    backgroundColor: '#457B9D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight:10
  },
  statRectangle_protein: {
    backgroundColor: '#E48F92',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight:10
  },
  statRectangle_fat: {
    backgroundColor: '#279B5C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight:10
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  listText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,


  },
  mealDetail: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,


  },
  deleteButton: {
    backgroundColor: '#C23111',
    padding: 5,
    borderRadius: 5,
    alignItems:'center',
    width:'20%',
    marginLeft:280
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
