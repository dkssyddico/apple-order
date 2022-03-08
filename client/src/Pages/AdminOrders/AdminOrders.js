import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Message from '../../Components/Message/Message';
import orderService from '../../service/order';
import { getToday } from '../../utils/date';
import styles from './AdminOrders.module.scss';
import { useSelector } from 'react-redux';

function AdminOrders() {
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const { isLoading, isError, data, error } = useQuery(['adminOrders', accessToken], async () => {
    let { data } = await orderService.getAllOrders(accessToken);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminOrders}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminOrders}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }
  console.log(data);
  return (
    <div className={styles.adminOrders}>
      <h1 className={styles.title}>Admin Orders</h1>
      <section className={styles.adminOrders__container}>
        <div className={styles.headSection}>
          <div className={styles.headBox}>
            <h3 className={styles.head}>{getToday()}</h3>
          </div>
          <div className={styles.headBox}>
            <h3 className={styles.head}>Order Id.</h3>
          </div>
          <div className={styles.headBox}>
            <h3 className={styles.head}>Date</h3>
          </div>
          <div className={styles.headBox}>
            <h3 className={styles.head}>Username</h3>
          </div>
          <div className={styles.headBox}>
            <h3 className={styles.head}>Status</h3>
          </div>
        </div>
        {data.orders &&
          data.orders.map((order) => (
            <section className={styles.contentContainer} key={order._id}>
              <div className={styles.contentBox}>
                <span
                  className={`${
                    order.createdAt.slice(0, 10) === getToday() ? styles.badge__new : styles.content
                  }`}
                >
                  {order.createdAt.slice(0, 10) === getToday() ? 'New' : null}
                </span>
              </div>
              <div className={styles.contentBox}>
                <span className={styles.content}>
                  <Link to={`/admin/orders/${order._id}`}>{order._id} </Link>
                </span>
              </div>
              <div className={styles.contentBox}>
                <span className={styles.content}>{`${order.createdAt.split('T')[0]} ${
                  order.createdAt.split('T')[1].split('.')[0]
                }`}</span>
              </div>
              <div className={styles.contentBox}>
                <span className={styles.content}>{order.user.username}</span>
              </div>
              <div className={styles.contentBox}>
                <span
                  className={`${
                    order.deliveryStatus
                      ? `${styles.badge__delivered}`
                      : `${styles.badge__InDelivery}`
                  }`}
                >
                  {order.deliveryStatus ? 'Delivered' : 'In Delivery'}
                </span>
              </div>
            </section>
          ))}
      </section>
    </div>
  );
}

export default AdminOrders;
