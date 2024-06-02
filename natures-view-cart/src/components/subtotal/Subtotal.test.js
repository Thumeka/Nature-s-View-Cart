/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Subtotal from './Subtotal';
import { StateProvider } from '../stateProvider/StateProvider';
import { initialState, reducer } from '../stateProvider/reducer';

const renderWithState = (ui, { initialState, reducer }) => {
    return render(
        <StateProvider initialState={initialState} reducer={reducer}>
            {ui}
        </StateProvider>
    );
};

test('renders Subtotal component with correct values', () => {
    const basket = [
        { id: 1, title: 'Item 1', price: 10 },
        { id: 2, title: 'Item 2', price: 20 },
    ];

    const initialStateWithBasket = {
        ...initialState,
        basket,
    };

    renderWithState(<Subtotal />, { initialState: initialStateWithBasket, reducer });

    const subtotalText = screen.getByText(/Subtotal \(2 items\): R30.00/i);
    expect(subtotalText).toBeInTheDocument();

    const giftCheckbox = screen.getByLabelText(/This order contains a gift/i);
    expect(giftCheckbox).toBeInTheDocument();
});

test('renders Subtotal component with empty basket', () => {
    renderWithState(<Subtotal />, { initialState, reducer });

    const subtotalText = screen.getByText(/Subtotal \(0 items\): R0.00/i);
    expect(subtotalText).toBeInTheDocument();
});

test('renders Proceed to Checkout button', () => {
    renderWithState(<Subtotal />, { initialState, reducer });

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    expect(checkoutButton).toBeInTheDocument();
});
