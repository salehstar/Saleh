import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// This is a mock value. In a real app, you'd get this from a state management solution.
const MOCK_FAST_END_TIME = new Date(Date.now() + 16 * 60 * 60 * 1000); // 16 hours from now

export default function HomeScreen() {
  const [timeLeft, setTimeLeft] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      const calculateTimeLeft = () => {
        const difference = MOCK_FAST_END_TIME.getTime() - new Date().getTime();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }

        return timeLeft;
      };

      const timer = setInterval(() => {
        const timeLeft = calculateTimeLeft();
        setTimeLeft(
          `${String(timeLeft.hours).padStart(2, '0')}:${String(
            timeLeft.minutes
          ).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
        );
      }, 1000);

      return () => clearInterval(timer);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Fast Ends In</Text>
      <Text style={styles.timer}>{timeLeft}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
