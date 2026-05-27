import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {

  let token = 'Token Not Available';

  // wajib physical device
  if (!Device.isDevice) {
    alert('Gunakan physical device');
    return 'Physical Device Required';
  }

  // cek permission notif
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  // request permission kalau belum
  if (existingStatus !== 'granted') {

    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  // kalau ditolak
  if (finalStatus !== 'granted') {

    alert('Permission notification denied');

    return 'Permission Denied';
  }

  // channel Android
  if (Platform.OS === 'android') {

    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',

        importance:
          Notifications.AndroidImportance.MAX,

        vibrationPattern: [
          0,
          250,
          250,
          250,
        ],

        lightColor: '#FF231F7C',
      }
    );
  }

  // ambil Expo Push Token
  try {

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId:
          '651e899a-edd3-476e-aacd-6ead71cc6b82',
      })
    ).data;

    console.log(
      'Expo Push Token:',
      token
    );

  } catch (error) {

    console.log(
      'TOKEN ERROR:',
      error
    );
  }

  console.log(
    'Notification permission granted'
  );

  return token;
}