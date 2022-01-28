import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import orderService from '../../service/order';
import styles from './AdminOrdersCard.module.css';

function AdminOrdersCard() {
  const { isLoading, isError, data, error } = useQuery('orders', async () => {
    let { data } = await orderService.getAllOrders();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminMainCard}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminMainCard}>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className={styles.adminMainCard}>
      <h2 className={styles.adminMainCard__title}>Orders</h2>
      <h3>
        {data.orders.length > 1 ? `${data.orders.length} orders` : `${data.orders.length} user`}
      </h3>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/orders'>See more</Link>
      </button>
    </div>
  );
}

export default AdminOrdersCard;
