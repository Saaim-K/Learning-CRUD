// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "learning-crud-e1d32.firebaseapp.com",
    projectId: "learning-crud-e1d32",
    storageBucket: "learning-crud-e1d32.appspot.com",
    messagingSenderId: "931183424307",
    appId: "1:931183424307:web:13cac3775bf4bd91c2c446",
    measurementId: "G-J3QSLNM8G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);