import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import orderService from '../../service/order';
import OrderItemCard from '../OrderItemCard/OrderItemCard';
import styles from './OrderDetailCard.module.scss';

function OrderDetailCard({ data, isAdmin }) {
  const navigate = useNavigate();

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
    <div>
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
            <OrderItemCard
              productId={item.productId}
              images={item.images}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
            />
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
            {isAdmin && !data.order.deliveryStatus && (
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

export default OrderDetailCard;
