import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { BsBoxSeam } from 'react-icons/bs';
import orderService from '../../service/order';
import styles from './AdminOrdersCard.module.scss';
import { getToday } from '../../utils/date';
import Message from '../Message/Message';
import { clearUser } from '../../reducers/userReducers';

function AdminOrdersCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;

  const { isLoading, isError, data, error } = useQuery(
    'orders',
    async () => {
      let { data } = await orderService.getAllOrders(accessToken);
      return data;
    },
    {
      onError: (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('r_token');
          localStorage.removeItem('userInfo');
          dispatch(clearUser());
          navigate('/login');
          toast.error('Login token is expired. Please login again');
        }
      },
    }
  );

  if (isLoading) {
    return (
      <div className={styles.adminMainCard}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminMainCard}>
        <Message>
          <p>{error.message}</p>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.adminMainCard}>
      <section className={styles.titleContainer}>
        <div className={styles.iconBox}>
          <BsBoxSeam className={styles.icon} />
        </div>
        <h2 className={styles.title}>Orders</h2>
      </section>
      <section className={styles.contentContainer}>
        <div className={styles.contentBox}>
          <h3 className={styles.contentHead}>Total</h3>
          <span className={styles.content}>{data.orders.length}</span>
        </div>
        <div className={styles.contentBox}>
          <h3 className={styles.contentHead}>Today</h3>
          <span className={styles.content}>
            {data.orders.filter((order) => order.createdAt.slice(0, 10) === getToday()).length}
          </span>
        </div>
      </section>
      <button className={styles.button}>
        <Link to='/admin/orders'>See details</Link>
      </button>
    </div>
  );
}

export default AdminOrdersCard;
