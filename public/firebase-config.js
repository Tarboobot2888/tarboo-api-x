// public/firebase-config.js

// استورد وظائف Firebase المطلوبة
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// إعدادات مشروعك من Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCrhxWtxRjeyCPGRUD3WAOCRS0yNqvq27E",
  authDomain: "tarboo-api-914ea.firebaseapp.com",
  projectId: "tarboo-api-914ea",
  storageBucket: "tarboo-api-914ea.appspot.com",
  messagingSenderId: "668697346516",
  appId: "1:668697346516:web:243f646ae8998c2ce61641",
  measurementId: "G-KCQ8HXQKJB"
};

// تهيئة Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
