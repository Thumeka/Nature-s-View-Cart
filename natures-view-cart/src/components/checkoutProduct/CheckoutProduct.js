import React from 'react';
import './checkoutProduct.css';
import { useStateValue } from '../stateProvider/StateProvider';

function CheckoutProduct({ id, image, title, price, rating }) {
    const [, dispatch] = useStateValue();

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    };

    return (
        <div className="checkoutProduct">
            <img src={image} alt={title} className="checkoutProduct__image" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>R</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, index) => (
                            <p key={index}>⭐</p> // Use star symbol
                        ))}
                </div>
                <button onClick={removeFromBasket} className="checkoutProduct__button">
                    Remove from basket
                </button>
            </div>
        </div>
    );
}

export default CheckoutProduct;
