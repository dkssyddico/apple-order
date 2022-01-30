import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './OrderSuccess.module.css';

function OrderSuccess() {
  const {
    state: { orderId },
  } = useLocation();

  return (
    <div className={styles.orderSuccess}>
      <div className={styles.infoContainer}>
        <h1>Thank you for your order!</h1>
        <p>
          Order number is{' '}
          <Link to={`/orders/${orderId}`}>
            <span className={styles.orderId}>{orderId}</span>
          </Link>{' '}
        </p>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.mainBtn}>
          <Link to='/'>Go to Main</Link>
        </button>
        <button className={styles.detailBtn}>
          <Link to={`/orders/${orderId}`}>Go to Order Detail</Link>
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
