import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { refreshCart } from '../../reducers/cartReducer';
import orderService from '../../service/order';
import styles from './Checkout.module.css';

function Checkout() {
  const {
    state: { items },
  } = useLocation();
  console.log(items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userId } = user;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentClick = () => {
    orderService
      .addOrder(userId, items)
      .then((res) => {
        let {
          data: { success, orderId },
        } = res;
        if (success) {
          navigate('/orderSuccess', { state: { orderId } });
          dispatch(refreshCart(userId));
        }
      })
      .catch((error) => {
        let {
          response: {
            data: { message },
          },
        } = error;
        setError(true);
        setErrorMessage(message ? message : error.message);
      });
  };

  useEffect(() => {
    if (items.length < 1) {
      navigate('/');
    }
  }, [items, navigate]);

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>checkout</h1>
      {error && <p>{errorMessage}</p>}
      <section className={styles.checkoutContainer}>
        <div className={styles.headContainer}>
          <div className={styles.head}>
            <h2>Product</h2>
          </div>
          <div className={styles.head}>
            <h2>Price</h2>
          </div>
          <div className={styles.head}>
            <h2>Quantity</h2>
          </div>
        </div>
        <div className={styles.contentContainer}>
          {items.map((item) => (
            <div key={uuidv4()} className={styles.contents}>
              <section className={styles.content}>
                <div>
                  <img
                    className={styles.image}
                    src={`http://localhost:4000/${item.images[0].filePath}`}
                    alt="product"
                  />
                </div>
                <p className={styles.itemName}>{item.name}</p>
              </section>
              <section className={styles.content}>
                <span>${item.price * item.quantity}</span>
              </section>
              <section className={styles.content}>
                <span>{item.quantity}</span>
              </section>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.summaryContainer}>
        <p>
          Total price:{' '}
          {items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}
        </p>
        <p>
          Total items:{' '}
          {items ? items.filter((item) => item.canBeSold).length : 0}
        </p>
      </section>
      <section className={styles.btnContainer}>
        <button
          className={styles.paymentBtn}
          onClick={() => handlePaymentClick()}
        >
          Payment
        </button>
      </section>
    </div>
  );
}

export default Checkout;
