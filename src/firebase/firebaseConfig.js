import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyBxDJa0PD7b1lDLfw6OWc996dXCf91rPrQ',
    authDomain: 'remindernotificationapp-c1641.firebaseapp.com',
    projectId: 'remindernotificationapp-c1641',
    storageBucket: 'remindernotificationapp-c1641.firebasestorage.app',
    messagingSenderId: '1063443942985',
    appId: '1:1063443942985:android:97a0cad36e3e69f5ccb998'
};

const app = initializeApp(firebaseConfig);

export default app;