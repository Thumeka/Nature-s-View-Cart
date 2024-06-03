import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../stateProvider/StateProvider';

jest.mock('../stateProvider/StateProvider', () => ({
    useStateValue: jest.fn(),
}));

describe('CheckoutProduct Component', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        useStateValue.mockReturnValue([{}, mockDispatch]);
    });

    test('renders CheckoutProduct component with correct details', () => {
        const product = {
            id: '1',
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 100,
            rating: 5,
        };

        render(
            <CheckoutProduct 
                id={product.id} 
                title={product.title} 
                image={product.image} 
                price={product.price} 
                rating={product.rating} 
            />
        );

        expect(screen.getByAltText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText(/R100/)).toBeInTheDocument();
        expect(screen.getAllByText('⭐')).toHaveLength(5);
    });

    test('dispatches REMOVE_FROM_BASKET action on button click', () => {
        const product = {
            id: '1',
            title: 'Test Product',
            image: 'test-image.jpg',
            price: 100,
            rating: 5,
        };

        render(
            <CheckoutProduct 
                id={product.id} 
                title={product.title} 
                image={product.image} 
                price={product.price} 
                rating={product.rating} 
            />
        );

        fireEvent.click(screen.getByText('Remove from basket'));
        
        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'REMOVE_FROM_BASKET',
            id: product.id,
        });
    });
});
