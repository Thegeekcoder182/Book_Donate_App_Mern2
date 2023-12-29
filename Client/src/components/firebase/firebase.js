// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import for authentication

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOiO0RiEacBJ1EEwtHxLZCRLApKYzO81w",
  authDomain: "bookdonateapp.firebaseapp.com",
  projectId: "bookdonateapp",
  storageBucket: "bookdonateapp.appspot.com",
  messagingSenderId: "497794771440",
  appId: "1:497794771440:web:7252f4412a27045e451535",
  measurementId: "G-ZXNP3JVJWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
