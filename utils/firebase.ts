import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAeWqXodbSfTMqUkBdUXqtwDVWqjGu2LEM",
  authDomain: "vora-eb106.firebaseapp.com",
  projectId: "vora-eb106",
  storageBucket: "vora-eb106.appspot.com",
  messagingSenderId: "1042042098502",
  appId: "1:1042042098502:web:634e100f3407743f318b47",
  measurementId: "G-ZC7BDVJ17V",
};

export const app = initializeApp(firebaseConfig, {});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
