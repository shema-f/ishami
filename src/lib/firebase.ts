import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyChSixeb-RMRBvZoFBIqzQub2TYquqdODM",
  authDomain: "ishami-7187d.firebaseapp.com",
  projectId: "ishami-7187d",
  storageBucket: "ishami-7187d.firebasestorage.app",
  messagingSenderId: "551728090851",
  appId: "1:551728090851:web:bcd2e648c45b0edef67fd6",
  measurementId: "G-1QHL0KTPDQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported()
        .then((supported) => (supported ? getAnalytics(app) : null))
        .catch(() => null)
    : Promise.resolve(null);
