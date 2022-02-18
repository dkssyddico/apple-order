import React from 'react';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
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

  const onChangeDelivered = (orderId) => {
    let confirm = window.confirm('Do you want to change delivery status?');
    if (confirm) {
      orderService
        .changeDeliverStatus(orderId)
        .then((res) => {
          toast.success('Delivery status was successfully changed!');
          navigate('/admin/orders');
        })
        .catch((error) => {
          let {
            response: {
              data: { message },
            },
          } = error;
          toast.error(message ? message : error.message);
        });
    }
  };

  return (
    <div className={styles.orderDetail}>
      <h1 className={styles.title}>Admin Order Detail</h1>
      <section className={styles.metaContainer}>
        <div className={styles.dateBox}>
          <p>
            Order Date <span>{data.order.createdAt.slice(0, 10)}</span>
          </p>
        </div>
        <div className={styles.orderNumberBox}>
          <p>
            Order No.
            <span>{data.order._id}</span>
          </p>
        </div>
        <div className={styles.statusBox}>
          <span>Status</span>
          <div
            className={`${styles.status} ${
              data.order.deliveryStatus ? styles.delivered : styles.inDeliver
            }`}
          >
            {data.order.deliveryStatus ? 'Delivered' : 'In delivery'}
          </div>
        </div>
      </section>
      <div className={styles.container}>
        <section className={styles.itemsContainer}>
          <h2 className={styles.subTitle}>Items</h2>
          <div className={styles.headBox}>
            <div className={styles.head}>
              <h4>Info</h4>
            </div>
            <div className={styles.head}>
              <h4>Price</h4>
            </div>
            <div className={styles.head}></div>
          </div>
          {data.order.items.map((item) => (
            <div key={item.productId} className={styles.orderItemCard}>
              <div className={styles.infoBox}>
                <img className={styles.image} src={item.images[0].filePath} alt='product' />
                <h4 className={styles.itemName}>{item.name}</h4>
              </div>
              <div className={styles.priceBox}>
                <p className={styles.priceNQuantity}>
                  ${item.quantity * item.price} | {item.quantity}ea
                </p>
              </div>
              <div className={styles.detailBox}>
                <Link to={`/admin/products/${item._id}`}>Detail</Link>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.orderInfoContainer}>
          <section className={styles.shippingContainer}>
            <h2 className={styles.subTitle}>Shipping Info</h2>
            <div className={styles.infoContainer}>
              <div className={styles.infoBox}>
                <span>Name</span>
                <span className={styles.infoHighlight}>{data.order.shippingInfo.fullName}</span>
              </div>
              <div className={styles.infoBox}>
                <span>Address</span>
                <span className={styles.infoHighlight}>{data.order.shippingInfo.address}</span>
              </div>
              <div className={styles.infoBox}>
                <span>Contact</span>
                <span className={styles.infoHighlight}>{data.order.shippingInfo.contact}</span>
              </div>
            </div>
          </section>
          <section className={styles.ordererContainer}>
            <h2 className={styles.subTitle}>Orderer Info</h2>
            <div className={styles.infoContainer}>
              <div className={styles.infoBox}>
                <span>Name</span>
                <span className={styles.infoHighlight}>{data.order.user.username}</span>
              </div>
              <div className={styles.infoBox}>
                <span>Email</span>
                <span className={styles.infoHighlight}>{data.order.user.email}</span>
              </div>
            </div>
            {!data.order.deliveryStatus && (
              <div className={styles.deliverBox}>
                <button onClick={() => onChangeDelivered(data.order._id)}>
                  Change to Delivered
                </button>
              </div>
            )}
          </section>
        </section>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
