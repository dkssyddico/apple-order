import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import userService from '../../service/user';
import styles from './AdminUserCard.module.scss';
import { getToday } from '../../utils/date';
import Message from '../Message/Message';

function AdminUserCard() {
  const { isLoading, isError, data, error } = useQuery('users', async () => {
    let { data } = await userService.getAll();
    return data;
  });
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
