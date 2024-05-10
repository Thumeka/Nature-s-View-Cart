// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSSKAF5L0rFApG7j_JrwKaw3H8LtnIiA4",
  authDomain: "nature-s-cart.firebaseapp.com",
  projectId: "nature-s-cart",
  storageBucket: "nature-s-cart.appspot.com",
  messagingSenderId: "168210363008",
  appId: "1:168210363008:web:df8900ff5b8c6c9c8aec65",
  measurementId: "G-ZF2G0CRQLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
