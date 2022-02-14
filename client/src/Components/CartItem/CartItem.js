import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDelete } from 'react-icons/ti';
import styles from './CartItem.module.css';
import { changeQty, deleteItemInCart } from '../../reducers/cartReducer';

function CartItem({ name, images, price, quantity, canBeSold, productId }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userId } = user;

  const handleDelete = (productId) => {
    let confirm = window.confirm('해당 상품을 장바구니에서 삭제하시겠습니까?');
    if (confirm) {
      dispatch(deleteItemInCart({ userId, productId }));
    }
  };

  const handleQtyBtnClick = (event) => {
    const { name } = event.target;
    switch (name) {
      case 'increment':
        let incrementInfo = {
          productId,
          quantity: parseInt(quantity) + 1,
        };
        dispatch(changeQty(incrementInfo));
        break;
      case 'decrement':
        if (parseInt(quantity) - 1 < 1) {
          alert('상품 수량은 1개 이상이어야 합니다.');
        } else {
          let decrementInfo = {
            productId,
            quantity: parseInt(quantity) - 1,
          };
          dispatch(changeQty(decrementInfo));
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.contents}>
      <section className={styles.content}>
        <input type='checkbox' />
      </section>
      <section className={styles.content}>
        <div className={styles.infoBox}>
          <Link to={`/product/${productId}`}>
            <div className={styles.imgBox}>
              <img className={styles.image} src={images[0].filePath} alt='product' />
            </div>
            <p className={styles.itemName}>{name}</p>
          </Link>
          <div className={styles.iconBox} onClick={() => handleDelete(productId)}>
            <TiDelete
              style={{
                cursor: 'pointer',
                color: 'lightgray',
                fontSize: '1.5em',
              }}
            />
          </div>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.qtyContainer}>
          <button onClick={handleQtyBtnClick} className={styles.qtyBtn} name='decrement'>
            -
          </button>
          <div className={styles.qtyBox}>
            <span>{parseInt(quantity)}</span>
          </div>
          <button onClick={handleQtyBtnClick} className={styles.qtyBtn} name='increment'>
            +
          </button>
        </div>
      </section>
      <section className={styles.content}>
        <div className={styles.box}>
          <span>${canBeSold ? price * quantity : '0'}</span>
        </div>
      </section>
    </div>
  );
}

export default CartItem;
