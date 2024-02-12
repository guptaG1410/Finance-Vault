// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4W9bgLLUBrchdmWvX2RqBXp5mN6ym7lU",
  authDomain: "finance-vault.firebaseapp.com",
  projectId: "finance-vault",
  storageBucket: "finance-vault.appspot.com",
  messagingSenderId: "235820156862",
  appId: "1:235820156862:web:d0cd95f9486eec7fd71bef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
