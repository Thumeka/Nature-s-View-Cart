import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home'; 
import { db } from '../../firebase'; 
import { collection, getDocs } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    getDocs: jest.fn(),
}));

jest.mock('../../firebase', () => ({
    db: jest.fn(),
}));

const mockProducts = [
    {
        id: '1',
        title: 'Product 1',
        image: 'image1.jpg',
        price: 10,
        rating: 4,
        category: 'Fruits',
        subcategory: 'Citrus'
    },
    {
        id: '2',
        title: 'Product 2',
        image: 'image2.jpg',
        price: 20,
        rating: 5,
        category: 'Vegetables',
        subcategory: 'Leafy'
    },
];

describe('Home Component', () => {
    beforeEach(async () => {
        getDocs.mockResolvedValue({
            docs: mockProducts.map((product) => ({
                id: product.id,
                data: () => product,
            })),
        });
    });

    test('renders categories and products correctly', async () => {
        render(<Home />);

        expect(await screen.findByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Fruits'));
        expect(screen.getByText('Citrus (1)')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Citrus (1)'));
        expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    test('renders features section correctly', () => {
        render(<Home />);

        expect(screen.getByText('fresh and organic')).toBeInTheDocument();
        expect(screen.getByText('free delivery')).toBeInTheDocument();
        expect(screen.getByText('easy payments')).toBeInTheDocument();
    });
});
