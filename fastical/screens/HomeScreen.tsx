import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FastingContext } from '../context/FastingContext';

export default function HomeScreen() {
  const { fastEndTime } = React.useContext(FastingContext);
  const [timeLeft, setTimeLeft] = React.useState('');

  useFocusEffect(
    React.useCallback(() => {
      if (!fastEndTime) {
        return;
      }

      const calculateTimeLeft = () => {
        const difference = fastEndTime.getTime() - new Date().getTime();
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
    }, [fastEndTime])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Fast Ends In</Text>
      <Text style={styles.timer}>{timeLeft || '00:00:00'}</Text>
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
