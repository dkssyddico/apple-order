import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import orderService from '../../service/order';
import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.scss';

function Orders() {
  const user = useSelector((state) => state.user);
  const { userId } = user;
  const offset = 4;
  const [index, setIndex] = useState(1);
  const [totalOrders, setTotalOrders] = useState(null);

  const { isLoading, isError, data, error } = useQuery(['orders', index], async () => {
    let { data } = await orderService.getOrderByUserId(userId, index);
    setTotalOrders(Math.ceil(data.total / offset));
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

  const handleIndexDecrease = () => {
    if (index === 1) return;
    setIndex((prev) => prev - 1);
  };

  const handleIndexIncrease = () => {
    if (index === totalOrders) return;
    setIndex((prev) => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.orders}>
        {data.orders.map((order) => (
          <OrderCard
            key={order._id}
            id={order._id}
            items={order.items}
            createdAt={order.createdAt.slice(0, 10)}
            deliveryStatus={order.deliveryStatus}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <button onClick={handleIndexDecrease} className={styles.paginationBtn}>
          <VscTriangleLeft className={styles.paginationIcon} />
        </button>
        <div className={styles.paginationNumBox}>
          <span className={styles.paginationNum}>{index}</span>
        </div>
        <button onClick={handleIndexIncrease} className={styles.paginationBtn}>
          <VscTriangleRight className={styles.paginationIcon} />
        </button>
      </div>
    </div>
  );
}

export default Orders;
