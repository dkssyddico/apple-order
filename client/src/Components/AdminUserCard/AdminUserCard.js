import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { clearUser } from '../../reducers/userReducers';
import userService from '../../service/user';
import styles from './AdminUserCard.module.css';
import { getToday } from '../../utils/date';

function AdminUserCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data, error } = useQuery(
    'users',
    async () => {
      let { data } = await userService.getAll();
      return data;
    },
    {
      onError: (error) => {
        if (error.response.status === 401) {
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

  const newUser = data.users.filter((user) => user.createdAt.slice(0, 10) === getToday()).length;

  return (
    <div className={styles.adminMainCard}>
      <section className={styles.adminMainCard__titleContainer}>
        <div className={styles.adminMainCard__iconBox}>
          <FaUser className={styles.adminMainCard__icon} />
        </div>
        <h2 className={styles.adminMainCard__title}>Customers</h2>
      </section>
      <section className={styles.adminMainCard__contentContainer}>
        <div className={styles.adminMainCard__contentBox}>
          <h3 className={styles.adminMainCard__contentHead}>Total</h3>
          <span className={styles.adminMainCard__content}>{data.users.length}</span>
        </div>
        <div className={styles.adminMainCard__contentBox}>
          <h3 className={styles.adminMainCard__contentHead}>New</h3>
          <span className={styles.adminMainCard__content}>{newUser}</span>
        </div>
      </section>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/users'>See details</Link>
      </button>
    </div>
  );
}

export default AdminUserCard;
