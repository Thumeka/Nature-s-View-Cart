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

**Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

**Your web app's Firebase configuration

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

$ npm install -g firebase-tools

# Technology
**React.js**: Handles the dynamic and responsive frontend.

- **Firebase**: Manages backend operations including database interactions, user authentication, and web hosting.

**Third-Party Services Used:**  

- **Stripe**: Manages secure payment processing.


 **React Frontend:**
     - Use `create-react-app` to initiate your React application.
     
     - Implement routing using `react-router-dom` for navigating between pages such as Home, Product Categories, Cart, and User Profile.
  **Firebase:**
     - Create a Firebase project through the Firebase Console.
     
     - Integrate Firebase into your project by installing the necessary SDKs (`firebase`).
**Firebase Functions:**
     - Use Firebase Functions to handle backend logic such as order processing and integrating with payment gateways like Stripe for handling payments.

 **User Authentication and Profile Management**
   - Implement components for user authentication including login, registration, and user profile management.
   
   - Allow users to view and edit their profiles, check their order histories, and track current order statuses.

**Responsive UI Design**
   - Ensure the website is responsive and accessible on all devices using CSS frameworks like Bootstrap or through custom responsive CSS.

 **Payment Integration**
   - Integrate a payment solution such as Stripe or PayPal to handle payments, ensuring to handle sensitive data securely using Firebase Functions.

# Usage
*Once installed, you can use Nature's view cart to:

*Add items to your cart from the available list.

*View the contents of your cart.

*Update quantities or remove items from your cart.

*checkout and card payment.

# Contributions
I welcome contributions to Nature's view cart! If you have suggestions for improvements or bug fixes, please follow these steps:

*Fork the repository.

*Create a new branch for your feature or fix.

*Commit your changes and open a pull request.
