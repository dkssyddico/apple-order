import React from 'react';
import Orders from '../../Components/Orders/Orders';
import styles from './OrderHistory.module.css';

function OrderHistory() {
  return (
    <div className='container'>
      <h1 className={styles.title}>Order history</h1>
      <Orders />
    </div>
  );
}

export default OrderHistory;
