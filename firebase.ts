// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrnha9az1i2mWOhjZs5zJBZbaWD9ndH6s",
  authDomain: "blinkit-clone-b410b.firebaseapp.com",
  projectId: "blinkit-clone-b410b",
  storageBucket: "blinkit-clone-b410b.firebasestorage.app",
  messagingSenderId: "1079827140391",
  appId: "1:1079827140391:web:19c9f82c7a9f72f7cae302",
  measurementId: "G-SVFRLYQFWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.useDeviceLanguage();

export { auth };