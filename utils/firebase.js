// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2X2jGGbcToPBNIjljlZ3y-RBuh_W8FNk",
  authDomain: "q2d-fire-system.firebaseapp.com",
  databaseURL: "https://q2d-fire-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "q2d-fire-system",
  storageBucket: "q2d-fire-system.appspot.com",
  messagingSenderId: "161326644940",
  appId: "1:161326644940:web:55e3af84ec6f47d67c0c69",
  measurementId: "G-S78GHRCK2M"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };