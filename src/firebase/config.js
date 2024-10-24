// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC372EGHyYJaF9sVT5-LsCZdMZbDqKOHM",
  authDomain: "auth-app-fa2f5.firebaseapp.com",
  projectId: "auth-app-fa2f5",
  storageBucket: "auth-app-fa2f5.appspot.com",
  messagingSenderId: "1014670704599",
  appId: "1:1014670704599:web:4a8ebae278d4f1efe55592"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);