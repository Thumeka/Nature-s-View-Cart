import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
    Link: ({ children }) => <div>{children}</div>,
}));

jest.mock('firebase/auth', () => ({
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
}));

jest.mock('../../firebase', () => ({
    auth: jest.fn(),
}));

describe('Login Component', () => {
    const navigate = jest.fn();

    beforeEach(() => {
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders Login component', () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByText('Sign in')).toBeInTheDocument();
        expect(screen.getByText('Create your Nature\'s View Cart account')).toBeInTheDocument();
    });

    test('handles sign in', async () => {
        signInWithEmailAndPassword.mockResolvedValue({ user: {} });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Sign in'));

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
        expect(navigate).toHaveBeenCalledWith('/');
    });

    test('handles registration', async () => {
        createUserWithEmailAndPassword.mockResolvedValue({ user: {} });

        render(
            <Router>
                <Login />
            </Router>
        );

        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByText('Create your Nature\'s View Cart account'));

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'password123');
        expect(navigate).toHaveBeenCalledWith('/');
    });
});
