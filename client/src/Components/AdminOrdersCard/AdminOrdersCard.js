import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BsBoxSeam } from 'react-icons/bs';
import { clearUser } from '../../reducers/userReducers';
import orderService from '../../service/order';
import styles from './AdminOrdersCard.module.css';
import { getToday } from '../../utils/date';

function AdminOrdersCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data, error } = useQuery(
    'orders',
    async () => {
      let { data } = await orderService.getAllOrders();
      return data;
    },
    {
      onError: (error) => {
        const { status } = error.response;
        if (status === 401) {
          alert(
            error.response.data.message
              ? error.response.data.message
              : error.response.data.error.name
          );
          navigate('/login'); // 리프레쉬 토큰이 만료된 경우 새로 로그인 유도.
          localStorage.removeItem('r_token');
          dispatch(clearUser());
        }
      },
    }
  );

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

  const newOrder = data.orders.filter(
    (order) => order.createdAt.slice(0, 10) === getToday()
  ).length;
  return (
    <div className={styles.adminMainCard}>
      <section className={styles.adminMainCard__titleContainer}>
        <div className={styles.adminMainCard__iconBox}>
          <BsBoxSeam className={styles.adminMainCard__icon} />
        </div>
        <h2 className={styles.adminMainCard__title}>Orders</h2>
      </section>
      <section className={styles.adminMainCard__contentContainer}>
        <div className={styles.adminMainCard__contentBox}>
          <h3 className={styles.adminMainCard__contentHead}>Total</h3>
          <span className={styles.adminMainCard__content}>{data.orders.length}</span>
        </div>
        <div className={styles.adminMainCard__contentBox}>
          <h3 className={styles.adminMainCard__contentHead}>Today</h3>
          <span className={styles.adminMainCard__content}>{newOrder}</span>
        </div>
      </section>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/orders'>See details</Link>
      </button>
    </div>
  );
}

export default AdminOrdersCard;
