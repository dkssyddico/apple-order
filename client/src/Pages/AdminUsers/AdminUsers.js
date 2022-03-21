import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../service/user';
import styles from './AdminUsers.module.scss';
import Message from '../../Components/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../reducers/userReducers';
import toast from 'react-hot-toast';

function AdminUsers() {
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
