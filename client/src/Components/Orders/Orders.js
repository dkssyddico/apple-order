import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderService from '../../service/order';
import OrderCard from '../OrderCard/OrderCard';
import styles from './Orders.module.css';
import { clearUser } from '../../reducers/userReducers';
import toast from 'react-hot-toast';

function Orders() {
  const user = useSelector((state) => state.user);
  const { userId } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, data, error } = useQuery(
    'orders',
    async () => {
      let { data } = await orderService.getOrderByUserId(userId);
      return data;
    },
    {
      onError: (error) => {
        const { status } = error.response;
        if (status === 401) {
          // alert(
          //   error.response.data.message
          //     ? error.response.data.message
          //     : error.response.data.error.name
          // );
          toast.error(
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
      <div className={styles.orders}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.orders}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.orders}>
      {data.orders.map((order) => (
        <OrderCard
          key={order._id}
          id={order._id}
          items={order.items}
          createdAt={order.createdAt.slice(0, 10)}
        />
      ))}
    </div>
  );
}

export default Orders;
