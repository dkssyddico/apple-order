import React from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { FaUser } from 'react-icons/fa';
import userService from '../../service/user';
import styles from './AdminUserCard.module.scss';
import { getToday } from '../../utils/date';
import { clearUser } from '../../reducers/userReducers';
import Message from '../Message/Message';

function AdminUserCard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const { isLoading, isError, data, error } = useQuery(
    ['users', accessToken],
    async () => {
      let { data } = await userService.getAll(accessToken);
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

  const newUser = data.users.filter((user) => user.createdAt.slice(0, 10) === getToday()).length;

  return (
    <div className={styles.adminMainCard}>
      <section className={styles.titleContainer}>
        <div className={styles.iconBox}>
          <FaUser className={styles.icon} />
        </div>
        <h2 className={styles.title}>Customers</h2>
      </section>
      <section className={styles.contentContainer}>
        <div className={styles.contentBox}>
          <h3 className={styles.contentHead}>Total</h3>
          <span className={styles.content}>{data.users.length}</span>
        </div>
        <div className={styles.contentBox}>
          <h3 className={styles.contentHead}>New</h3>
          <span className={styles.content}>{newUser}</span>
        </div>
      </section>
      <button className={styles.button}>
        <Link to='/admin/users'>See details</Link>
      </button>
    </div>
  );
}

export default AdminUserCard;
