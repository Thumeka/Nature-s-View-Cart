import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSSKAF5L0rFApG7j_JrwKaw3H8LtnIiA4",
  authDomain: "nature-s-cart.firebaseapp.com",
  databaseURL: "https://nature-s-cart-default-rtdb.firebaseio.com",
  projectId: "nature-s-cart",
  storageBucket: "nature-s-cart.appspot.com",
  messagingSenderId: "168210363008",
  appId: "1:168210363008:web:df8900ff5b8c6c9c8aec65",
  measurementId: "G-ZF2G0CRQLG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
