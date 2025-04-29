 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3RnvQ_qmM9Hq0M9lVU05fuDudBNqDx9o",
  authDomain: "simple-firebase-augth4.firebaseapp.com",
  projectId: "simple-firebase-augth4",
  storageBucket: "simple-firebase-augth4.firebasestorage.app",
  messagingSenderId: "631885304392",
  appId: "1:631885304392:web:de4da1e4160092df03be7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);