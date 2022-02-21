import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userService from '../../service/user';
import styles from './AdminUsers.module.scss';
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
