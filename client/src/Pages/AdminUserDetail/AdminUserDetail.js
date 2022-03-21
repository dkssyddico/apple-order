import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../../Components/Message/Message';
import OrderCard from '../../Components/OrderCard/OrderCard';
import { clearUser } from '../../reducers/userReducers';
import userService from '../../service/user';
import styles from './AdminUserDetail.module.scss';

function AdminUserDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const { userId } = useParams();
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');

  const handleDelete = (userId) => {
    const confirm = window.confirm('정말 이 유저를 삭제합니까?');
    if (confirm) {
      userService
        .remove(userId)
        .then((response) => {
          let {
            data: { success },
          } = response;
          if (success) {
            navigate('/admin/users');
          }
        })
        .catch((error) => {
          let {
            response: {
              data: { message },
            },
          } = error;
          setDeleteError(true);
          setDeleteErrorMessage(message ? message : error.message);
        });
    }
  };

  const { isLoading, isError, data, error } = useQuery(
    ['user', userId, accessToken],
    async () => {
      let { data } = await userService.getProfile({ userId, accessToken });
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
      <div className={styles.adminUserDetail}>
        <Message>
          <p>Now loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminUserDetail}>
        <Message>
          <span>Error: {error.message}</span>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.adminUserDetail}>
      <h1 className={styles.title}>User Info</h1>
      <section className={styles.container}>
        <div className={styles.infoContainer}>
          <p>Username: {data.info && data.info.username}</p>
          <p>Email: {data.info && data.info.email}</p>
          <button className={styles.deleteBtn} onClick={() => handleDelete(userId)}>
            Remove this user
          </button>
        </div>
        {deleteError && <p>{deleteErrorMessage}</p>}
        <div className={styles.orderContainer}>
          <h2 className={styles.orderTitle}>Order list({data.info && data.info.orders.length})</h2>
          <div className={styles.orders}>
            {data.info &&
              data.info.orders.map((order) => (
                <OrderCard
                  key={order._id}
                  id={order._id}
                  items={order.items}
                  createdAt={order.createdAt.slice(0, 10)}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminUserDetail;
