import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { refreshCart } from '../../reducers/cartReducer';
import orderService from '../../service/order';
import styles from './Checkout.module.css';

function Checkout() {
  const {
    state: { items },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userId } = user;

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const watchFields = watch();

  const submitShippingForm = (data) => {
    let shippingInfo = data;
    orderService
      .addOrder(userId, { items, shippingInfo })
      .then((res) => {
        let {
          data: { success, orderId },
        } = res;
        if (success) {
          navigate('/orderSuccess', { state: { orderId } });
          dispatch(refreshCart(userId));
        }
      })
      .catch((error) => {
        let {
          response: {
            data: { message },
          },
        } = error;
        toast.error(message ? message : error.message);
      });
  };

  useEffect(() => {
    if (items.length < 1) {
      navigate('/');
    }
  }, [items, navigate]);

  return (
    <div className={styles.checkout}>
      <h1 className={styles.title}>checkout</h1>
      <div className={styles.container}>
        <section className={styles.orderContainer}>
          <section className={styles.itemsContainer}>
            <div className={styles.headBox}>
              <div className={styles.head}>
                <h2>Product</h2>
              </div>
              <div className={styles.head}>
                <h2>Price</h2>
              </div>
              <div className={styles.head}>
                <h2>Quantity</h2>
              </div>
            </div>
            <div className={styles.container__contentBox}>
              {items.map((item) => (
                <div key={uuidv4()} className={styles.contentCard}>
                  <section className={styles.content}>
                    <div className={styles.imageBox}>
                      <img className={styles.image} src={item.images[0].filePath} alt='product' />
                    </div>
                    <p className={styles.itemName}>{item.name}</p>
                  </section>
                  <section className={styles.content}>
                    <span>${item.price * item.quantity}</span>
                  </section>
                  <section className={styles.content}>
                    <span>{item.quantity}</span>
                  </section>
                </div>
              ))}
            </div>
          </section>
        </section>
        <section className={styles.paymentContainer}>
          <h2 className={styles.shipping__title}>Shipping Address</h2>
          <form className={styles.shipping__form} onSubmit={handleSubmit(submitShippingForm)}>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                {...register('fullName', { required: true })}
                name='fullName'
                type='text'
                required
              ></input>
              <label className={styles.shipping__label} htmlFor='fullName'>
                Full Name
              </label>
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                {...register('address', { required: true })}
                name='address'
                type='text'
                required
              ></input>
              <label className={styles.shipping__label} htmlFor='address'>
                Address
              </label>
            </div>
            <div className={styles.inputBox}>
              <input
                className={styles.input}
                {...register('contact', { required: true })}
                name='contact'
                type='text'
                required
              ></input>
              <label className={styles.shipping__label} htmlFor='contact'>
                Contact
              </label>
            </div>
            <div className={styles.totalPriceContainer}>
              <span>Total price</span>
              <span>${items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}</span>
            </div>
            <button className={styles.paymentBtn} onSubmit={handleSubmit(submitShippingForm)}>
              Payment
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
