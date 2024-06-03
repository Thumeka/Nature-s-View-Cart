import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Footer Component', () => {
    test('renders Footer component with company information', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Get Help')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('Follow Us')).toBeInTheDocument();
        expect(screen.getByText(/Natures View Cart. All rights reserved./)).toBeInTheDocument();
    });

    test('opens modal with About Us content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('About Us'));

        expect(screen.getByText(/Welcome to Natures View Cart/)).toBeInTheDocument();
    });

    test('opens modal with Our Services content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Our Services'));

        expect(screen.getByText(/At Natures View Cart, we are committed to providing an exceptional shopping experience/)).toBeInTheDocument();
    });

    test('opens modal with Privacy Policy content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Privacy Policy'));

        expect(screen.getByText(/Privacy Policy for Nature's Cart/)).toBeInTheDocument();
    });

    test('navigates to Vegetables category', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Vegetables'));

        expect(navigate).toHaveBeenCalledWith('/category/Vegetables');
    });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('Footer Component', () => {
    test('renders Footer component with company information', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        expect(screen.getByText('Company')).toBeInTheDocument();
        expect(screen.getByText('Get Help')).toBeInTheDocument();
        expect(screen.getByText('Shop')).toBeInTheDocument();
        expect(screen.getByText('Follow Us')).toBeInTheDocument();
        expect(screen.getByText(/Natures View Cart. All rights reserved./)).toBeInTheDocument();
    });

    test('opens modal with About Us content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('About Us'));

        expect(screen.getByText(/Welcome to Natures View Cart/)).toBeInTheDocument();
    });

    test('opens modal with Our Services content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Our Services'));

        expect(screen.getByText(/At Natures View Cart, we are committed to providing an exceptional shopping experience/)).toBeInTheDocument();
    });

    test('opens modal with Privacy Policy content', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Privacy Policy'));

        expect(screen.getByText(/Privacy Policy for Nature's Cart/)).toBeInTheDocument();
    });

    test('navigates to Vegetables category', () => {
        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigate);

        render(
            <Router>
                <Footer />
            </Router>
        );

        fireEvent.click(screen.getByText('Vegetables'));

        expect(navigate).toHaveBeenCalledWith('/category/Vegetables');
    });
});
