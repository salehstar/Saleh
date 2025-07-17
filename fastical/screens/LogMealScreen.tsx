import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FastingContext } from '../context/FastingContext';

export default function LogMealScreen() {
  const [description, setDescription] = React.useState('');
  const [calories, setCalories] = React.useState('');
  const { fastEndTime, setFastEndTime } = React.useContext(FastingContext);

  const handleLogMeal = async () => {
    try {
      const response = await fetch('http://localhost:3000/meals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          calories: parseInt(calories),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log meal');
      }

      const fastHoursResponse = await fetch('http://localhost:3000/fast-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          calories: parseInt(calories),
          // Assuming a TDEE of 2000 for now
          tdee: 2000,
        }),
      });

      if (!fastHoursResponse.ok) {
        throw new Error('Failed to calculate fast hours');
      }

      const fastHoursData = await fastHoursResponse.json();
      const newFastDuration = fastHoursData.fastHours * 60 * 60 * 1000;

      const newFastEndTime = fastEndTime
        ? new Date(fastEndTime.getTime() + newFastDuration)
        : new Date(Date.now() + newFastDuration);

      setFastEndTime(newFastEndTime);

      Alert.alert(
        'Meal Logged!',
        `You now need to fast for ${fastHoursData.fastHours.toFixed(1)} hours.`
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to log meal.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log a Meal</Text>
      <Text style={styles.label}>Meal Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="e.g., Chicken salad"
      />
      <Text style={styles.label}>Calories</Text>
      <TextInput
        style={styles.input}
        value={calories}
        onChangeText={setCalories}
        placeholder="e.g., 500"
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogMeal}>
        <Text style={styles.buttonText}>Log Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
