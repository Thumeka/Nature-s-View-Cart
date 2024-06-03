import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Product from './Product';
import { useStateValue } from '../stateProvider/StateProvider';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

jest.mock('../stateProvider/StateProvider', () => ({
    useStateValue: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    uploadBytes: jest.fn(),
    getDownloadURL: jest.fn(),
}));

describe('Product Component', () => {
    const mockDispatch = jest.fn();
    const mockStorage = {
        ref: jest.fn(),
    };

    beforeEach(() => {
        useStateValue.mockReturnValue([{}, mockDispatch]);
        getStorage.mockReturnValue(mockStorage);
        ref.mockReturnValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const product = {
        id: '1',
        title: 'Test Product',
        image: 'test-image.jpg',
        price: 100,
        rating: 5,
        category: 'Category',
        subcategory: 'Subcategory',
    };

    test('renders Product component with correct details', () => {
        render(<Product {...product} />);

        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(`${product.category} / ${product.subcategory}`)).toBeInTheDocument();
        expect(screen.getByText(/R100/)).toBeInTheDocument();
        expect(screen.getAllByRole('img')[0]).toHaveAttribute('src', product.image);
        expect(screen.getAllByText('★')).toHaveLength(product.rating);
    });

    test('handles Add to basket', () => {
        render(<Product {...product} />);

        fireEvent.click(screen.getByText('Add to basket'));

        expect(mockDispatch).toHaveBeenCalledWith({
            type: 'ADD_TO_BASKET',
            item: {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                rating: product.rating,
            },
        });
    });

    test('handles image upload', async () => {
        const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
        const newImageUrl = 'https://example.com/new-image.jpg';

        uploadBytes.mockResolvedValueOnce({});
        getDownloadURL.mockResolvedValueOnce(newImageUrl);

        render(<Product {...product} />);

        const input = screen.getByLabelText('image-upload-input'); // Assuming the input field has aria-label="image-upload-input"
        fireEvent.change(input, { target: { files: [file] } });

        expect(screen.getByText('Uploading...')).toBeInTheDocument();

        await waitFor(() => expect(getDownloadURL).toHaveBeenCalled());
        expect(screen.getByRole('img')).toHaveAttribute('src', newImageUrl);
        expect(screen.queryByText('Uploading...')).not.toBeInTheDocument();
    });
});
