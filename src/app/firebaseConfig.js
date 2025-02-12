import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_zuZoYh8OVyYpRvCEDG-zoA3eX8mrfZQ",
    authDomain: "spot-financial.firebaseapp.com",
    projectId: "spot-financial",
    storageBucket:  "spot-financial.appspot.com",
    messagingSenderId: "970733336355",
    appId: "1:970733336355:web:4170abaf0a6c8a9e01fe96",
    // measurementId: "G-BVFRBMFQ7C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };

