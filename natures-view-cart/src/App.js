import React, { useEffect } from 'react';
import './App.css';
import Home from './components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Header from './components/Header/Header';
import Checkout from './components/checkout/Checkout';
import Login from './components/login/Login';
import Footer from './components/footer/Footer';
import { useStateValue } from './components/stateProvider/StateProvider';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PMCGw2KMT6aYSni972UYvgIWuPTkPhgDbqFhLi9bsGVEU62aZXODi0LmRDtZYx3VREWTSCrZVGD0tfXXB55NGIO00BqqpE1Jt');

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // The user is logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });

    return () => {
      // Any clean up operation goes in here
      unsubscribe();
    };
  }, [dispatch]);

  console.log('USER IS >>>>>', user);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/checkout" 
            element={
              <>
                <Header />
                <Elements stripe={stripePromise}>
                  <Checkout />
                </Elements>
                <Footer />
              </>
            } 
          />
          <Route path="/" element={<><Header /><Home /><Footer /></>} />
          <Route path="/category/:category" element={<><Header /><Home /><Footer /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
