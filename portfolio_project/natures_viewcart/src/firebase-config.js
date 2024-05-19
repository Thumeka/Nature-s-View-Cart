// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/firestorage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCSSKAF5L0rFApG7j_JrwKaw3H8LtnIiA4',
  authDomain: 'nature-s-cart.firebaseapp.com',
  projectId: 'nature-s-cart',
  storageBucket: 'nature-s-cart.appspot.com',
  messagingSenderId: '168210363008',
  appId: '1:168210363008:web:df8900ff5b8c6c9c8aec65',
  measurementId: 'G-ZF2G0CRQLG'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { firebaseConfig, firestore, auth, storage };
