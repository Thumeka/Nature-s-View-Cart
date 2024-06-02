import React from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    const { error, token } = await stripe.createToken(cardNumberElement);

    if (error) {
      console.error(error);
    } else {
      const response = await fetch('/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      });

      if (response.ok) {
        console.log('Payment successful');
      } else {
        console.log('Payment failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="form-group">
        <label htmlFor="card-number">Card number</label>
        <CardNumberElement id="card-number" className="stripe-element" />
      </div>
      <div className="form-group">
        <label htmlFor="card-expiry">Expiration</label>
        <CardExpiryElement id="card-expiry" className="stripe-element" />
      </div>
      <div className="form-group">
        <label htmlFor="card-cvc">CVC</label>
        <CardCvcElement id="card-cvc" className="stripe-element" />
      </div>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <select id="country" name="country" className="stripe-element">
          <option value="South Africa">South Africa</option>
          {/* Add other countries as needed */}
        </select>
      </div>
      <button type="submit" disabled={!stripe} className="submit-button">
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;

