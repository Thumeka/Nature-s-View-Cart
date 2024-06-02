import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { StateProvider } from './components/stateProvider/StateProvider';
import reducer, { initialState } from './components/reducer';
import { auth } from './firebase';

jest.mock('./firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(),
}));

jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }) => <div>{children}</div>,
}));

jest.mock('firebase/storage');

test('renders login page when user is not authenticated', () => {
  auth.onAuthStateChanged.mockImplementation((callback) => {
    callback(null);
  });

  render(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  );

  expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
});

test('renders home page when user is authenticated', () => {
  const user = { email: 'test@example.com' };
  auth.onAuthStateChanged.mockImplementation((callback) => {
    callback(user);
  });

  render(
    <StateProvider initialState={{ ...initialState, user }} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  );

  expect(screen.getByText(/Home/i)).toBeInTheDocument();
});

test('navigates to checkout page', () => {
  const user = { email: 'test@example.com' };
  auth.onAuthStateChanged.mockImplementation((callback) => {
    callback(user);
  });

  render(
    <StateProvider initialState={{ ...initialState, user }} reducer={reducer}>
      <Router>
        <App />
      </Router>
    </StateProvider>
  );

  fireEvent.click(screen.getByText(/Checkout/i));
  expect(screen.getByText(/Order Summary/i)).toBeInTheDocument();
});
