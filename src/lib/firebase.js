// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCq6YT-4BtABsddnq9l3oKc7NI8x_kI-Lk",
//   authDomain: "megachat-61f2a.firebaseapp.com",
//   projectId: "megachat-61f2a",
//   storageBucket: "megachat-61f2a.firebasestorage.app",
//   messagingSenderId: "1058205125473",
//   appId: "1:1058205125473:web:ec12e4375acabfd5111320"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq6YT-4BtABsddnq9l3oKc7NI8x_kI-Lk",
  authDomain: "megachat-61f2a.firebaseapp.com",
  projectId: "megachat-61f2a",
  storageBucket: "megachat-61f2a.firebasestorage.app",
  messagingSenderId: "1058205125473",
  appId: "1:1058205125473:web:ec12e4375acabfd5111320"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);