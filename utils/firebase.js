import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP0MaWsAZhpryeiiVGgGiNK7lYPgqUf8Q",
  authDomain: "adruino-7b5a8.firebaseapp.com",
  databaseURL: "https://adruino-7b5a8-default-rtdb.firebaseio.com",
  projectId: "adruino-7b5a8",
  storageBucket: "adruino-7b5a8.appspot.com",
  messagingSenderId: "183983165199",
  appId: "1:183983165199:web:5e64cdd69931c0c162787a",
  measurementId: "G-CRZLSKV6VV"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

// Initialize Cloud Storage and get a reference to the service

const db = getDatabase(app)
export {auth, db }