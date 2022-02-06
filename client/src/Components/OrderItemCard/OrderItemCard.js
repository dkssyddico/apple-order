import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../reducers/cartReducer';
import styles from './OrderItemCard.module.css';

function OrderItemCard({ productId, images, name, quantity, price }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { userId } = user;
  const { items } = cart;
  const onHandleCartClick = () => {
    let cartData = {
      userId,
      productId,
      quantity: 1,
    };
    let existence =
      items.filter((item) => item.productId === productId).length > 0
        ? true
        : false;
    if (existence) {
      alert('이미 장바구니에 있는 상품입니다.');
    } else {
      let confirm = window.confirm(
        `다음과 같은 상품을 장바구니에 넣으시겠습니까?\n${name} 1개 ${
          1 * price
        }`
      );
      if (confirm) {
        dispatch(addToCart(cartData));
      }
    }
  };

  return (
    <div className={styles.orderItemCard}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <Link to={`/product/${productId}`}>
            <img
              className={styles.image}
              src={images[0].filePath}
              alt="product"
            ></img>
          </Link>
        </div>
        <div className={styles.metaContainer}>
          <h4 className={styles.itemName}>{name}</h4>
          <p className={styles.priceNQuantity}>
            ${quantity * price} | {quantity}ea
          </p>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={onHandleCartClick} className={styles.cartBtn}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderItemCard;
