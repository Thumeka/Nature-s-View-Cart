import React from 'react';
import { useStateValue } from '../stateProvider/StateProvider';
import CheckoutProduct from '../checkoutProduct/CheckoutProduct';
import Subtotal from '../subtotal/Subtotal';
import CheckoutForm from '../../CheckoutForm';
import './Checkout.css';

function Checkout() {
    const [{ basket }] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                    className="checkout__ad" 
                    src="https://firebasestorage.googleapis.com/v0/b/nature-s-cart.appspot.com/o/checkoout-ad.jpg?alt=media&token=0c5d991a-ddea-4d6f-a1c7-5fb91b4c1a87" 
                    alt="ad" 
                />
                {basket?.length === 0 ? (
                    <div>
                        <h2>Your shopping basket is empty</h2>
                        <p>
                            You have no items in your basket. To buy one or add items to your basket, click the add to basket button.
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2 className="checkout__title">Your shopping basket</h2>
                        {basket.map(item => (
                            <CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                )}
            </div>
            {basket?.length > 0 && 
                <div className="checkout__right">
                    <Subtotal />
                    <CheckoutForm />
                </div>
            }
        </div>
    );
}

export default Checkout;
