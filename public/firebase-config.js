// public/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCrhxWtxRjeyCPGRUD3WAOCRS0yNqvq27E",
    authDomain: "tarboo-api-914ea.firebaseapp.com",
    projectId: "tarboo-api-914ea",
    storageBucket: "tarboo-api-914ea.appspot.com",
    messagingSenderId: "668697346516",
    appId: "1:668697346516:web:243f646ae8998c2ce61641",
    measurementId: "G-KCQ8HXQKJB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
    return signOut(auth);
};

export const saveUserData = (userId, data) => {
    return setDoc(doc(db, "users", userId), data);
};

export const getUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};
