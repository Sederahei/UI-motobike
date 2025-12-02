// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAskZVmjwxwXJHNOk_QedEzMbnQ3recQeA",
  authDomain: "motobike-c2479.firebaseapp.com",
  projectId: "motobike-c2479",
  storageBucket: "motobike-c2479.firebasestorage.app",
  messagingSenderId: "2092675818",
  appId: "1:2092675818:web:156eed33ab138225bddd93",
  measurementId: "G-W9GWP3T8G0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);