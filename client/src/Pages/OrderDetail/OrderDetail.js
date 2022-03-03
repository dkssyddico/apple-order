import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import orderService from '../../service/order';
import styles from './OrderDetail.module.scss';
import OrderDetailCard from '../../Components/OrderDetailCard/OrderDetailCard';

function OrderDetail() {
  const { orderId } = useParams();

  const { isLoading, isError, data, error } = useQuery('orderDetail', async () => {
    let { data } = await orderService.getOrderByOrderId(orderId);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.orderDetail}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orderDetail}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.orderDetail}>
      <h1 className={styles.title}>Order Detail</h1>
      <OrderDetailCard data={data} isAdmin={false} />
    </div>
  );
}

export default OrderDetail;
