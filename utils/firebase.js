import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, db, auth };