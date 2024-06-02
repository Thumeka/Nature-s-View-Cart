// Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import Header from './Header';
import { StateProvider, useStateValue } from '../stateProvider/StateProvider';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../stateProvider/StateProvider', () => ({
    useStateValue: jest.fn(),
}));

describe('Header', () => {
    const mockNavigate = useNavigate();
    const mockSignOut = signOut;
    const mockGetDocs = getDocs;
    
    const initialState = {
        basket: [],
        user: null,
    };

    const mockState = [initialState, jest.fn()];

    beforeEach(() => {
        useStateValue.mockReturnValue(mockState);
        mockNavigate.mockReturnValue(jest.fn());
    });

    test('renders header component', () => {
        render(
            <StateProvider>
                <Router>
                    <Header />
                </Router>
            </StateProvider>
        );
        expect(screen.getByAltText('Store Logo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    test('redirects to login when user clicks Sign In', () => {
        render(
            <StateProvider>
                <Router>
                    <Header />
                </Router>
            </StateProvider>
        );
        fireEvent.click(screen.getByText('Sign In'));
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('handles search submission', async () => {
        const mockQuerySnapshot = {
            forEach: jest.fn(callback => {
                const data = [{ id: '1', name: 'Product 1' }];
                data.forEach(doc => callback({ id: doc.id, data: () => doc }));
            }),
        };
        mockGetDocs.mockResolvedValue(mockQuerySnapshot);
        
        render(
            <StateProvider>
                <Router>
                    <Header />
                </Router>
            </StateProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Search products...'), {
            target: { value: 'milk' },
        });
        fireEvent.submit(screen.getByRole('button', { name: /search/i }));

        expect(mockGetDocs).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/search-results', {
            state: { products: [{ id: '1', name: 'Product 1' }] },
        });
    });

    test('signs out user when clicking Sign Out', async () => {
        mockState[0].user = { email: 'test@example.com' };
        mockSignOut.mockResolvedValue();
        
        render(
            <StateProvider>
                <Router>
                    <Header />
                </Router>
            </StateProvider>
        );

        fireEvent.click(screen.getByText('Sign Out'));
        expect(mockSignOut).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});

