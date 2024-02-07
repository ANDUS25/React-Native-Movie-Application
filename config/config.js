// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth, initializeAuth,getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5o_4aIGBWOoGOEXmv32zPB6tggeaTnJg",
  authDomain: "moviebase-3dc8d.firebaseapp.com",
  projectId: "moviebase-3dc8d",
  storageBucket: "moviebase-3dc8d.appspot.com",
  messagingSenderId: "8410647937",
  appId: "1:8410647937:web:5103bb0a4f68398b06ac80",
  measurementId: "G-Z6ZBHRG2W5",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth, getApp, getAuth };

