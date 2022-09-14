import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesDoneThunk } from '../redux/actions';
import { useSelector } from 'react-redux';
import '../styles/purchases.css';

const Purchases = () => {
  const dispatch = useDispatch();
  const purchasesDone = useSelector(state => state.purchasesDone);

  useEffect(() => {
    dispatch(getPurchasesDoneThunk());
  }, []);

  console.log(purchasesDone);

  return (
    <div className="purchases">
      <h3>My purchases</h3>
      <ul>
        {purchasesDone.map(purchaseDone => (
          <article className="purchase-card" key={purchaseDone.id}>
            <div className="purchase-date">{purchaseDone.createdAt}</div>
            <div className="purchase-data">
              <p> {purchaseDone.cart?.products[0]?.title}</p>
              <div className="quantity">
                {' '}
                <p>
                  {purchaseDone.cart?.products[0]?.productsInCart.quantity}
                </p>{' '}
              </div>
              <p className="price">{purchaseDone.cart?.products[0]?.price}</p>
            </div>
          </article>
        ))}
      </ul>
    </div>
  );
};

export default Purchases;
