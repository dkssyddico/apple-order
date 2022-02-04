import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCart } from '../../reducers/cartReducer';
import styles from './Cart.module.css';
import CartItem from '../../Components/CartItem/CartItem';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userId } = user;
  let { items } = cart;
  console.log(items);

  useEffect(() => {
    dispatch(getCart(userId));
  }, [dispatch, userId]);

  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { items } });
  };

  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Cart</h1>
      <section className={styles.cartContainer}>
        <div className={styles.headContainer}>
          <div className={styles.head}>
            <input type='checkbox' />
          </div>
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
        <div className={styles.contentContainer}>
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
            </div>
          )}
        </div>
      </section>
      <section className={styles.summaryContainer}>
        <h1>Total price: ${items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}</h1>
        <h1>Total items: {items ? items.filter((item) => item.canBeSold).length : 0}</h1>
      </section>
      <section className={styles.checkoutContainer}>
        <button className={styles.shoppingBtn}>
          <Link to='/'>Keep shopping</Link>
        </button>
        <button
          onClick={() => handleCheckoutClick()}
          disabled={items.filter((item) => !item.canBeSold).length > 0}
          className={styles.checkoutBtn}
        >
          Checkout
        </button>
      </section>
    </div>
  );
}

export default Cart;
