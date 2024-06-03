import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { StateProvider } from './components/stateProvider/StateProvider';
import { auth } from './firebase';

jest.mock('./components/Home/Home', () => () => <div>Home Component</div>);
jest.mock('./components/Header/Header', () => () => <div>Header Component</div>);
jest.mock('./components/checkout/Checkout', () => () => <div>Checkout Component</div>);
jest.mock('./components/login/Login', () => () => <div>Login Component</div>);
jest.mock('./components/footer/Footer', () => () => <div>Footer Component</div>);
jest.mock('@stripe/react-stripe-js', () => ({
  Elements: ({ children }) => <div>{children}</div>
}));
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: () => ({})
}));
jest.mock('./firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}));

const mockState = {
  user: null,
};

const customRender = (ui, { providerProps = {}, ...renderOptions } = {}) => {
  return render(
    <StateProvider initialState={mockState} reducer={() => {}}>
      {ui}
    </StateProvider>,
    renderOptions
  );
};

describe('App Component', () => {
  beforeEach(() => {
    auth.onAuthStateChanged.mockImplementation((callback) => {
      callback(null); // Simulate user being logged out
      return jest.fn(); // Return unsubscribe function
    });
  });

  test('renders Home component for the root path', async () => {
    customRender(
      <Router>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText(/Home Component/i)).toBeInTheDocument();
    });
  });

  test('renders Login component for the /login path', async () => {
    window.history.pushState({}, 'Login Page', '/login');
    customRender(
      <Router>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText(/Login Component/i)).toBeInTheDocument();
    });
  });

  test('renders Checkout component for the /checkout path', async () => {
    window.history.pushState({}, 'Checkout Page', '/checkout');
    customRender(
      <Router>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getByText(/Checkout Component/i)).toBeInTheDocument();
    });
  });

  test('renders Header component on all routes', async () => {
    customRender(
      <Router>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getAllByText(/Header Component/i).length).toBeGreaterThan(0);
    });
  });

  test('renders Footer component on all routes', async () => {
    customRender(
      <Router>
        <App />
      </Router>
    );
    await waitFor(() => {
      expect(screen.getAllByText(/Footer Component/i).length).toBeGreaterThan(0);
    });
  });
});
