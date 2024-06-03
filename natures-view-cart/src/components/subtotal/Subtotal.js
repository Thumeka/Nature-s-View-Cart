import React from 'react';
import { NumericFormat } from 'react-number-format';
import { useStateValue } from '../stateProvider/StateProvider';
import './Subtotal.css';
import { getBasketTotal } from '../stateProvider/reducer';

function Subtotal() {
    const [{ basket }] = useStateValue();

    return (
        <div className="subtotal">
            <NumericFormat
                value={getBasketTotal(basket)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'R'}
                decimalScale={2}
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This order contains a gift
                        </small>
                    </>
                )}
            />
            <button>Proceed to Checkout</button>
        </div>
    );
}

export default Subtotal;
