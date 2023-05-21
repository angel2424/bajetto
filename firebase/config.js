// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi4Wk9jh5-PMAhuNhKqh4TFBRX4VbdqUw",
  authDomain: "bajetto-20c42.firebaseapp.com",
  projectId: "bajetto-20c42",
  storageBucket: "bajetto-20c42.appspot.com",
  messagingSenderId: "414640780365",
  appId: "1:414640780365:web:2e81a668f6efa8fcdf1804",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, functions };
