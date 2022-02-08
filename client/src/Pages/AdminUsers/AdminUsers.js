import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userService from '../../service/user';
import styles from './AdminUsers.module.css';
import { clearUser } from '../../reducers/userReducers';

function AdminUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery(
    'user',
    async () => {
      let { data } = await userService.getAll();
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
      <div className={styles.adminUsers}>
        <p>Now loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminUsers}>
        <span>Error: {error.message}</span>
      </div>
    );
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
