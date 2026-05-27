import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as Notifications
  from 'expo-notifications';

import {
  registerForPushNotificationsAsync,
} from '../services/notificationService';

export default function HomeScreen() {

  const [expoPushToken,
    setExpoPushToken] = useState('');

  const notificationListener =
    useRef();

  const responseListener =
    useRef();

  useEffect(() => {

    registerForPushNotificationsAsync()
      .then(token => {

        if (token) {
          setExpoPushToken(token);
        }
      });

    notificationListener.current =
      Notifications
        .addNotificationReceivedListener(
          notification => {
            console.log(notification);
          });

    responseListener.current =
      Notifications
        .addNotificationResponseReceivedListener(
          response => {
            console.log(response);
          });

    return () => {

      Notifications
        .removeNotificationSubscription(
          notificationListener.current
        );

      Notifications
        .removeNotificationSubscription(
          responseListener.current
        );
    };

  }, []);

  async function sendLocalNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Study Break Reminder',
        body: 'Udah 25 menit belajar. Istirahat bentar biar fokus balik!',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
        channelId: 'default',
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Study Break Reminder
      </Text>

      <Text style={styles.description}>
        Belajar terus itu bagus, tapi otak juga butuh istirahat.
      </Text>

      <Text style={styles.label}>
        Study Session Status:
      </Text>

      <Text style={styles.token}>
        {expoPushToken}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={sendLocalNotification}
      >
        <Text style={styles.buttonText}>
          Start Study Session
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 14,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});