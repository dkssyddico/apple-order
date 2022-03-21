import React from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Message from '../../Components/Message/Message';
import OrderDetailCard from '../../Components/OrderDetailCard/OrderDetailCard';
import orderService from '../../service/order';
import styles from './AdminOrderDetail.module.scss';
import { clearUser } from '../../reducers/userReducers';

function AdminOrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const { isLoading, isError, data, error } = useQuery(
    ['orderDetail', orderId, accessToken],
    async () => {
      let { data } = await orderService.getOrderByOrderId({ orderId, accessToken });
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
      <div className={styles.orderDetail}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orderDetail}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
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
