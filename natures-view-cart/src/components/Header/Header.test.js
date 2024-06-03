/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';
import { StateProvider } from '../stateProvider/StateProvider';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('@mui/icons-material/Search', () => () => <div>SearchIcon</div>);
jest.mock('@mui/icons-material/ShoppingBasket', () => () => <div>ShoppingBasketIcon</div>);

const mockState = {
  basket: [],
  user: null,
};

const customRender = (ui, { providerProps = {}, ...renderOptions } = {}) => {
  return render(
    <StateProvider initialState={mockState} reducer={() => {}}>
      <Router>{ui}</Router>
    </StateProvider>,
    renderOptions
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    getAuth.mockReturnValue({ signOut: jest.fn() });
    getFirestore.mockReturnValue({});
  });

  test('renders the header logo', () => {
    customRender(<Header />);
    const logo = screen.getByAltText(/Store Logo/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders the search input and button', () => {
    customRender(<Header />);
    const searchInput = screen.getByPlaceholderText(/Search products.../i);
    const searchButton = screen.getByText(/SearchIcon/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('renders the sign-in link for guests', () => {
    customRender(<Header />);
    const signInLink = screen.getByText(/Sign In/i);
    expect(signInLink).toBeInTheDocument();
  });

  test('renders the sign-out link for logged-in users', () => {
    const loggedInState = {
      basket: [],
      user: { email: 'test@example.com' },
    };

    customRender(<Header />, { providerProps: { initialState: loggedInState } });
    const signOutLink = screen.getByText(/Sign Out/i);
    expect(signOutLink).toBeInTheDocument();
  });

  test('handles search input change', () => {
    customRender(<Header />);
    const searchInput = screen.getByPlaceholderText(/Search products.../i);
    fireEvent.change(searchInput, { target: { value: 'test product' } });
    expect(searchInput.value).toBe('test product');
  });

  test('handles category change', () => {
    customRender(<Header />);
    const categorySelect = screen.getByDisplayValue(/All Categories/i);
    fireEvent.change(categorySelect, { target: { value: 'dairy' } });
    expect(categorySelect.value).toBe('dairy');
  });
});

