import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Checkout from './Checkout'; 
import { useStateValue } from '../stateProvider/StateProvider';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct';
import Subtotal from '../subtotal/Subtotal';
import CheckoutForm from '../../CheckoutForm';

jest.mock('../stateProvider/StateProvider', () => ({
    useStateValue: jest.fn(),
}));

jest.mock('../checkoutProduct/CheckoutProduct', () => jest.fn(() => <div>Mocked CheckoutProduct</div>));
jest.mock('../subtotal/Subtotal', () => jest.fn(() => <div>Mocked Subtotal</div>));
jest.mock('../../CheckoutForm', () => jest.fn(() => <div>Mocked CheckoutForm</div>));

describe('Checkout Component', () => {
    const mockBasket = [
        {
            id: '1',
            title: 'Product 1',
            image: 'image1.jpg',
            price: 10,
            rating: 4,
        },
        {
            id: '2',
            title: 'Product 2',
            image: 'image2.jpg',
            price: 20,
            rating: 5,
        },
    ];

    beforeEach(() => {
        useStateValue.mockReturnValue([{ basket: mockBasket }]);
    });

    test('renders Checkout component with items in the basket', () => {
        render(<Checkout />);

        expect(screen.getByText('Your shopping basket')).toBeInTheDocument();
        expect(screen.getByText('Mocked CheckoutProduct')).toBeInTheDocument();
        expect(screen.getByText('Mocked Subtotal')).toBeInTheDocument();
        expect(screen.getByText('Mocked CheckoutForm')).toBeInTheDocument();
    });

    test('renders Checkout component with an empty basket', () => {
        useStateValue.mockReturnValue([{ basket: [] }]);
        render(<Checkout />);

        expect(screen.getByText('Your shopping basket is empty')).toBeInTheDocument();
        expect(screen.getByText('You have no items in your basket. To buy one or add items to your basket, click the add to basket button.')).toBeInTheDocument();
    });
});
