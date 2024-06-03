import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { StateProvider, useStateValue } from './StateProvider';

const initialState = {
    basket: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                basket: state.basket.filter(item => item.id !== action.id),
            };
        default:
            return state;
    }
};

const TestComponent = () => {
    const [{ basket }, dispatch] = useStateValue();

    const addItem = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: { id: '1', title: 'Test Item' },
        });
    };

    const removeItem = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: '1',
        });
    };

    return (
        <div>
            <button onClick={addItem}>Add to basket</button>
            <button onClick={removeItem}>Remove from basket</button>
            <div data-testid="basket-count">Basket Count: {basket.length}</div>
        </div>
    );
};

describe('StateProvider', () => {
    test('adds item to basket', () => {
        render(
            <StateProvider initialState={initialState} reducer={reducer}>
                <TestComponent />
            </StateProvider>
        );

        fireEvent.click(screen.getByText('Add to basket'));
        expect(screen.getByTestId('basket-count')).toHaveTextContent('Basket Count: 1');
    });

    test('removes item from basket', () => {
        render(
            <StateProvider initialState={initialState} reducer={reducer}>
                <TestComponent />
            </StateProvider>
        );

        fireEvent.click(screen.getByText('Add to basket'));
        fireEvent.click(screen.getByText('Remove from basket'));
        expect(screen.getByTestId('basket-count')).toHaveTextContent('Basket Count: 0');
    });
});
