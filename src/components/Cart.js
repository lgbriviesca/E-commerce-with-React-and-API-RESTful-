import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductInCartThunk, addPurchasesThunk } from '../redux/actions';
import '../styles/cart.css';

const Cart = ({ isOpen }) => {
  const cart = useSelector(state => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addPurchase = () => {
    const purchase = {
      street: 'Green St. 1456',
      colony: 'Southwest',
      zipCode: 12345,
      city: 'USA',
      references: 'Some references',
    };
    console.log(purchase);

    dispatch(addPurchasesThunk(purchase));
  };

  const total = cart?.products?.map(
    productInCart =>
      productInCart?.productsInCart?.quantity * productInCart?.price
  );
  const zero = [0, 0];

  const sum = n => {
    const reducer = (accumulator, curr) => accumulator + curr;
    if (total !== [] && total !== undefined) {
      n = total.reduce(reducer);
    } else {
      n = zero.reduce(reducer);
    }
    return n;
  };

  return (
    <div className={`cart-modal ${isOpen ? 'open' : ''}`}>
      <h3>My cart</h3>
      <ul className="cart-list">
        {cart?.products?.map(productInCart => (
          <li key={productInCart.id}>
            <div className="brand-and-remove">
              {' '}
              {productInCart.brand}{' '}
              <button
                className="remove-button"
                onClick={() =>
                  dispatch(deleteProductInCartThunk(productInCart.id)
                  )
                }
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <strong className='strong' onClick={() => navigate(`/product/${productInCart.id}`)}>
              {productInCart.title}
            </strong>
            <div className="quantity-container">
              {productInCart.productsInCart.quantity}
            </div>
            <div className="total">
              {' '}
              <p className="total-filler">------------------------</p>{' '}
              <p className="total-total">Total:</p>{' '}
              <p>
                $ {productInCart.price * productInCart.productsInCart.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="general-price">
        <p className="total-total">Total:</p> <p>$ {sum()}</p>
      </div>

      <button className="button-checkout" onClick={() => {addPurchase()}}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
