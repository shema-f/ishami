import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBHymXsb9sYF7pE_i4mFOLWUYbVVvUaBGI',
  authDomain: 'ishamiapp.firebaseapp.com',
  projectId: 'ishamiapp',
  storageBucket: 'ishamiapp.firebasestorage.app',
  messagingSenderId: '935381983142',
  appId: '1:935381983142:web:db43d7b94bfd2cd7aeb967',
  measurementId: 'G-J9P2FTLTL9',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null)
    : Promise.resolve(null);
