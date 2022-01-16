import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import styles from './productDetail.module.css';
import { addToCart } from '../../reducers/cartReducer';
import productService from '../../service/product';
import { useQuery } from 'react-query';

function ProductDetail() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  let { id: productId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { login, userId } = user;
  const { items } = cart;
  const { isLoading, isError, data, error } = useQuery(['product', productId], async () => {
    let { data } = await productService.getInfo(productId);
    return data;
  });

  // 객체 형태로 줘야함.
  const handleCartClick = () => {
    if (!login) {
      alert('장바구니는 로그인하셔야 이용하실 수 있습니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }
    let userData = {
      userId,
      productId,
      quantity,
    };
    let existence = items.filter((item) => item.productId === productId).length > 0 ? true : false;
    if (existence) {
      alert('이미 장바구니에 있는 상품입니다.');
    } else {
      let confirm = window.confirm(
        `다음과 같은 상품을 장바구니에 넣으시겠습니까?\n${data.product.name} ${quantity}개 ${
          quantity * data.product.price
        }`
      );
      if (confirm) {
        dispatch(addToCart(userData));
      }
    }
  };

  const handleDecrement = () => {
    setQuantity((prev) => (parseInt(prev) === 1 ? 1 : parseInt(prev) - 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => parseInt(prev) + 1);
  };

  const handleQuantityChange = (e) => {
    let { value } = e.target;
    if (value === '') {
      alert('수량은 최소 1이 되어야합니다!');
      return;
    }
    setQuantity(parseInt(value));
  };

  if (isLoading) {
    return (
      <div className={styles.product}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.product}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.product}>
      <div className={styles.imageContainer}>
        <img
          className={styles.productImg}
          src={`http://localhost:4000/${data.product.images[0].filePath}`}
          alt='product'
        />
      </div>
      <div className={styles.infoContainer}>
        <h1 className={styles.name}>{data.product.name}</h1>
        <div className={styles.priceContainer}>
          <h3>Price</h3>
          <h3 className={styles.price}>${data.product.price}</h3>
        </div>
        <div className={styles.QtyContainer}>
          <h3>Quantity</h3>
          <div className={styles.QtyBtnContainer}>
            <button className={styles.QtyBtn} onClick={handleDecrement}>
              -
            </button>
            <input
              className={styles.input}
              type='number'
              onChange={handleQuantityChange}
              value={quantity}
            />
            <button className={styles.QtyBtn} onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
        <div className={styles.totalPriceContainer}>
          <h3>Total Price</h3>
          <h3 className={styles.totalPrice}>${quantity * data.product.price}</h3>
        </div>
        <div className={styles.btnContainer}>
          <button className={styles.cartBtn} onClick={handleCartClick}>
            Add to cart
          </button>
          <button className={styles.shopNowBtn}>Shop now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
