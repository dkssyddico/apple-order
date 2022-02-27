import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import OrderDetailCard from '../../Components/OrderDetailCard/OrderDetailCard';
import { clearUser } from '../../reducers/userReducers';
import orderService from '../../service/order';
import styles from './AdminOrderDetail.module.scss';

function AdminOrderDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderId } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    'orderDetail',
    async () => {
      let { data } = await orderService.getOrderByOrderId(orderId);
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
      <div className={styles.orderDetail}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orderDetail}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.orderDetail}>
      <h1 className={styles.title}>Admin Order Detail</h1>
      <OrderDetailCard data={data} isAdmin={true} />
    </div>
  );
}

export default AdminOrderDetail;
