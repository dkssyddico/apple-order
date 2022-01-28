import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import userService from '../../service/user';
import styles from './AdminUserCard.module.css';

function AdminUserCard() {
  const { isLoading, isError, data, error } = useQuery('users', async () => {
    let { data } = await userService.getAll();
    return data;
  });
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

  return (
    <div className={styles.adminMainCard}>
      <h2 className={styles.adminMainCard__title}>User</h2>
      <h3>{data.users.length > 1 ? `${data.users.length} users` : `${data.users.length} user`}</h3>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/users'>See more</Link>
      </button>
    </div>
  );
}

export default AdminUserCard;
