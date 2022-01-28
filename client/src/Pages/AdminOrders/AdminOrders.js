import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import orderService from '../../service/order';
import styles from './AdminOrders.module.css';

function AdminOrders() {
  const { isLoading, isError, data, error } = useQuery('adminOrders', async () => {
    let { data } = await orderService.getAllOrders();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminOrders}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminOrders}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminOrders}>
      <h1 className={styles.title}>Admin Orders</h1>
      <div className={styles.headBox}>
        <p className={styles.head}>Order Id.</p>
        <p className={styles.head}>Date</p>
      </div>
      <div className={styles.contentContainer}>
        {data.orders &&
          data.orders.map((order) => (
            <div className={styles.contentBox} key={order._id}>
              <p className={styles.content}>
                <Link to={`/admin/orders/${order._id}`}>{order._id} </Link>
              </p>
              <p className={styles.content}>{`${order.createdAt.split('T')[0]} ${
                order.createdAt.split('T')[1].split('.')[0]
              }`}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminOrders;
