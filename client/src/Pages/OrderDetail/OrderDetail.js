import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import orderService from '../../service/order';
import styles from './OrderDetail.module.css';
import OrderItemCard from '../../Components/OrderItemCard/OrderItemCard';
import { clearUser } from '../../reducers/userReducers';

function OrderDetail() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <h1 className={styles.title}>Order Detail</h1>
      <div className={styles.wholeContainer}>
        <div className={styles.metaContainer}>
          <h3>Order No. {data.order._id}</h3>
          <h3>Order Date: {data.order.createdAt}</h3>
          <h3>
            Total price:
            {` $${
              data.order.items &&
              data.order.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
            }`}
          </h3>
        </div>
        <div className={styles.itemsContainer}>
          {data.order.items &&
            data.order.items.map((item) => {
              return (
                <OrderItemCard
                  key={item.productId}
                  images={item.images}
                  productId={item.productId}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
