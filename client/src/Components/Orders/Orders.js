import React from 'react';
import { useQuery } from 'react-query';
import orderService from '../../service/order';
import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';
import { useSelector } from 'react-redux';

function Orders() {
  const user = useSelector((state) => state.user);
  const { userId } = user;

  const { isLoading, isError, data, error } = useQuery('orders', async () => {
    let { data } = await orderService.getOrderByUserId(userId);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.orders}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orders}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      {data.orders.map((order) => (
        <OrderCard
          key={order._id}
          id={order._id}
          items={order.items}
          createdAt={order.createdAt.slice(0, 10)}
        />
      ))}
    </div>
  );
}

export default Orders;
