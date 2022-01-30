// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqQ_pEpZIuHvGM7bG5FGCAYOPpH7-5B7w",
  authDomain: "fir-banzai.firebaseapp.com",
  projectId: "fir-banzai",
  storageBucket: "fir-banzai.appspot.com",
  messagingSenderId: "578747535473",
  appId: "1:578747535473:web:aa8f2c00234d7143964bd0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
