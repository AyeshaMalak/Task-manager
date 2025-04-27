// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBVSfuTBDBGFDdjiq0v_3NwkA3leisZkrY",
  authDomain: "task-manager-115fd.firebaseapp.com",
  projectId: "task-manager-115fd",
  storageBucket: "task-manager-115fd.firebasestorage.app",
  messagingSenderId: "14928944335",
  appId: "1:14928944335:web:a3c299bc6a3f237e59ebba",
  measurementId: "G-8B2Z8E2ER7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
