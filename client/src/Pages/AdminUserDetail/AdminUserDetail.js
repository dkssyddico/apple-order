import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import OrderCard from '../../Components/OrderCard/OrderCard';
import userService from '../../service/user';
import styles from './AdminUserDetail.module.css';

function AdminUserDetail() {
  const navigate = useNavigate();
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

  const { isLoading, isError, data, error } = useQuery('user', async () => {
    let { data } = await userService.getProfile(userId);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminUserDetail}>
        <p>Now loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminUserDetail}>
        <span>Error: {error.message}</span>
      </div>
    );
  }

  return (
    <div className={styles.adminUserDetail}>
      <h1 className={styles.title}>User Info</h1>
      <section>
        <div className={styles.infoContainer}>
          <p>Username: {data.info && data.info.username}</p>
          <p>Email: {data.info && data.info.email}</p>
        </div>
        {deleteError && <p>{deleteErrorMessage}</p>}
        <div className={styles.orderContainer}>
          <h2 className={styles.orderContainer__title}>Order list</h2>
          <div>
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
        <div className={styles.btnContainer}>
          <button className={styles.deleteBtn} onClick={() => handleDelete(userId)}>
            Remove this user
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminUserDetail;
