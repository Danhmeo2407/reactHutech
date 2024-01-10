/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCkVxCSumM_oWbrz8Ay_i2gUxR0vFD2BcY",
  authDomain: "hutech-2db65.firebaseapp.com",
  databaseURL: "https://hutech-2db65-default-rtdb.firebaseio.com",
  projectId: "hutech-2db65",
  storageBucket: "hutech-2db65.appspot.com",
  messagingSenderId: "581327819429",
  appId: "1:581327819429:web:d63439c97fa48216ba734c",
  measurementId: "G-TEJ3KDNBRX",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
