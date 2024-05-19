// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
