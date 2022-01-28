import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../service/user';
import styles from './AdminUsers.module.css';

function AdminUsers() {
  const { isLoading, isError, data, error } = useQuery('user', async () => {
    let { data } = await userService.getAll();
    return data;
  });
  if (isLoading) {
    return <h1>Now Loading</h1>;
  }
  if (isError) {
    console.log(error.response);
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className={styles.adminUsers}>
      <h1 className={styles.title}>Admin Users</h1>
      <section className={styles.tableContainer}>
        <div className={styles.headBox}>
          <h2 className={styles.head}>Username</h2>
          <h2 className={styles.head}>Email</h2>
          <h2 className={styles.head}>Orders</h2>
        </div>
        {data.users &&
          data.users.map((user) => (
            <div className={styles.contentBox} key={user._id}>
              <p className={styles.content}>
                <Link to={`/admin/users/${user._id}`}>{user.username}</Link>
              </p>
              <p className={styles.content}>{user.email}</p>
              <p className={styles.content}>{user.ordersCount}</p>
            </div>
          ))}
      </section>
    </div>
  );
}

export default AdminUsers;
