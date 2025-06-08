// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzHV6TITL3Xq1bFoeCNG7AZGUJP2krzCo",
  authDomain: "ease-commute-c6f88.firebaseapp.com",
  projectId: "ease-commute-c6f88",
  storageBucket: "ease-commute-c6f88.firebasestorage.app",
  messagingSenderId: "470595597676",
  appId: "1:470595597676:web:fa47de863942b66b80af49",
  measurementId: "G-H03BMWEGZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);