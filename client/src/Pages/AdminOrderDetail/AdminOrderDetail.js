import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Message from '../../Components/Message/Message';
import OrderDetailCard from '../../Components/OrderDetailCard/OrderDetailCard';
import orderService from '../../service/order';
import styles from './AdminOrderDetail.module.scss';

function AdminOrderDetail() {
  const { orderId } = useParams();
  const { isLoading, isError, data, error } = useQuery(['orderDetail', orderId], async () => {
    let { data } = await orderService.getOrderByOrderId(orderId);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.orderDetail}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orderDetail}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.orderDetail}>
      <h1 className={styles.title}>Admin Order Detail</h1>
      <OrderDetailCard data={data} isAdmin={true} />
    </div>
  );
}

export default AdminOrderDetail;
