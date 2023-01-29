// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDxqw412ZqvMKF6dWOAlq9uZL2mVwnNPac",
//   authDomain: "realtorff-a4ffa.firebaseapp.com",
//   projectId: "realtorff-a4ffa",
//   storageBucket: "realtorff-a4ffa.appspot.com",
//   messagingSenderId: "313005019057",
//   appId: "1:313005019057:web:cba4f76b23a8bb9169f790",
//   measurementId: "G-G4BFSR7JLY",
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
