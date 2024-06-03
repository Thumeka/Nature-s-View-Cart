# Nature-s-View-Cart
Portfolio project for alx front-end developer

# Introduction
Nature's View Cart is an e-commerce platform that allows users to register, login, add products to the shopping cart, and remove products from the shopping cart. Nature’s view cart will permit only an authenticated user to access the home page. It emphasizes a seamless shopping experience, focusing on the health and environmental benefits of organic products.

Here is a live demo of Nature's view cart - https://drive.google.com/file/d/1i2w79hHHRIKMv_UuMY2XnkYJ-lBgFUaz/view?usp=sharing

![image](https://github.com/Thumeka/Nature-s-View-Cart/assets/128834708/21ff949e-1ddf-46e4-abba-f0575973188a)

# Project Setup and Initial Configuration
$ npx create-react-app natures_viewcart
$ cd natures_viewcart

$ npm install firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project-authdomain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


npm install -g firebase-tools
