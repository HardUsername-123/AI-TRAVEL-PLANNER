// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYJTfeXB8nAZobCgJyo-Eos0SkNhNvpvk",
  authDomain: "is101-c86e0.firebaseapp.com",
  projectId: "is101-c86e0",
  storageBucket: "is101-c86e0.firebasestorage.app",
  messagingSenderId: "680485742096",
  appId: "1:680485742096:web:2854d89dd0577464f68c95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
