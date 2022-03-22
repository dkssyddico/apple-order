import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';
import orderService from '../../service/order';
import styles from './OrderDetail.module.scss';
import OrderDetailCard from '../../Components/OrderDetailCard/OrderDetailCard';
import Message from '../../Components/Message/Message';
import { clearUser } from '../../reducers/userReducers';

function OrderDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { accessToken } = user;
  const { orderId } = useParams();

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
      <h1 className={styles.title}>Order Detail</h1>
      <OrderDetailCard data={data} isAdmin={false} />
    </div>
  );
}

export default OrderDetail;
