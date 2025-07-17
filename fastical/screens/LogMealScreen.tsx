import * as React from 'react';
import { Text, View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FastingContext } from '../context/FastingContext';

export default function LogMealScreen() {
  const [description, setDescription] = React.useState('');
  const [calories, setCalories] = React.useState('');
  const { setFastEndTime } = React.useContext(FastingContext);

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
      const newFastEndTime = new Date(
        Date.now() + fastHoursData.fastHours * 60 * 60 * 1000
      );
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
      <Button title="Log Meal" onPress={handleLogMeal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});
