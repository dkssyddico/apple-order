import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getCart } from '../../reducers/cartReducer';
import styles from './Cart.module.scss';
import CartItem from '../../Components/CartItem/CartItem';
import { clearUser } from '../../reducers/userReducers';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userId, accessToken } = user;
  let { items, error } = cart;

  useEffect(() => {
    dispatch(getCart({ userId, accessToken }));
  }, [dispatch, accessToken, userId]);

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate('/login');
      localStorage.removeItem('r_token');
      localStorage.removeItem('userInfo');
      dispatch(clearUser());
      toast.error(error.message);
    }
  }, [error, dispatch, navigate]);

  const handleCheckoutClick = () => {
    if (items.length < 1) {
      toast.error('There is no items!');
      return;
    }
    navigate('/checkout', { state: { items } });
  };

  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.container}>
        <section className={styles.items}>
          <div className={styles.headBox}>
            <div className={styles.head}>
              <input type='checkbox' />
            </div>
            <div className={styles.head}>
              <h2>Product</h2>
            </div>
            <div className={styles.head}>
              <h2>Quantity</h2>
            </div>
            <div className={styles.head}>
              <h2>Price</h2>
            </div>
          </div>
          <div className={styles.contentBox}>
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem
                  key={item.productId}
                  name={item.name}
                  images={item.images}
                  price={item.price}
                  quantity={item.quantity}
                  canBeSold={item.canBeSold}
                  productId={item.productId}
                />
              ))
            ) : (
              <div className={styles.emptyBox}>
                <p>No Item in your cart</p>
                <button>
                  <Link to='/products'>Continue shopping</Link>
                </button>
              </div>
            )}
          </div>
          {items.length > 0 ? (
            <div className={styles.continueBox}>
              <button>
                <Link to='/products'>Continue shopping</Link>
              </button>
            </div>
          ) : null}
        </section>
        <section className={styles.summaryBox}>
          <h2 className={styles.summaryTitle}>Order summary</h2>
          <div className={styles.itemsBox}>
            <span>Total items</span>
            <span>{items ? items.filter((item) => item.canBeSold).length : 0}</span>
          </div>
          <div className={styles.priceBox}>
            <span>Total price</span>
            <span className={styles.price}>
              ${items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => handleCheckoutClick()}
            disabled={items.filter((item) => !item.canBeSold).length > 0}
            className={styles.checkoutBtn}
          >
            Checkout
          </button>
        </section>
      </div>
    </div>
  );
}

export default Cart;
