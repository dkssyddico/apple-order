import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../reducers/cartReducer';
import styles from './OrderItemCard.module.scss';

function OrderItemCard({ productId, images, name, quantity, price }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userId, isAdmin } = user;
  const { items } = cart;

  const onHandleCartClick = () => {
    let cartData = {
      userId,
      productId,
      quantity: 1,
    };
    let existence = items.filter((item) => item.productId === productId).length > 0 ? true : false;
    if (existence) {
      alert('이미 장바구니에 있는 상품입니다.');
    } else {
      let confirm = window.confirm(
        `다음과 같은 상품을 장바구니에 넣으시겠습니까?\n${name} 1개 ${1 * price}`
      );
      if (confirm) {
        dispatch(addToCart(cartData));
      }
    }
  };

  return (
    <div key={productId} className={styles.orderItemCard}>
      <div className={styles.infoBox}>
        <img className={styles.image} src={images[0].filePath} alt='product' />
        <h4 className={styles.itemName}>{name}</h4>
      </div>
      <div className={styles.priceBox}>
        <p className={styles.priceNQuantity}>
          ${quantity * price} | {quantity}ea
        </p>
      </div>
      <div className={styles.buttonBox}>
        {isAdmin ? (
          <button className={styles.button}>
            <Link to={`/admin/products/${productId}`}>Detail</Link>
          </button>
        ) : (
          <button className={styles.button} onClick={onHandleCartClick}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderItemCard;
