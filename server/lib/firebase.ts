// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiIyOYcT5KkcfJ_Vv6x8FT1KHne9diXeI",
  authDomain: "rentease-a00ae.firebaseapp.com",
  projectId: "rentease-a00ae",
  storageBucket: "rentease-a00ae.appspot.com",
  messagingSenderId: "448116008743",
  appId: "1:448116008743:web:a65acd4964395e65ac6b02"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const firestoreDb= getFirestore(firebaseApp)