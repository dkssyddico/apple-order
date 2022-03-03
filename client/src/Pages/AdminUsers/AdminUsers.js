import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../service/user';
import styles from './AdminUsers.module.scss';
import Message from '../../Components/Message/Message';

function AdminUsers() {
  const { isLoading, isError, data, error } = useQuery('user', async () => {
    let { data } = await userService.getAll();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminUsers}>
        <Message>
          <p>Now loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminUsers}>
        <Message>
          <span>Error: {error.message}</span>
        </Message>
      </div>
    );
  }

  console.log(data);

  return (
    <div className={styles.adminUsers}>
      <h1 className={styles.title}>Admin Users</h1>
      <section className={styles.tableContainer}>
        <div className={styles.headBox}>
          <h2 className={styles.head}>Username</h2>
          <h2 className={styles.head}>Admin</h2>
          <h2 className={styles.head}>Email</h2>
          <h2 className={styles.head}>Orders</h2>
        </div>
        {data.users &&
          data.users.map((user) => (
            <div className={styles.contentBox} key={user._id}>
              <div className={styles.content}>
                <span>
                  <Link to={`/admin/users/${user._id}`}>{user.username}</Link>
                </span>
              </div>
              <div className={styles.content}>
                <span>{user.role === 0 ? ' O' : 'X'}</span>
              </div>
              <div className={styles.content}>
                <span>{user.email}</span>
              </div>
              <div className={styles.content}>
                <span>{user.ordersCount}</span>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}

export default AdminUsers;
