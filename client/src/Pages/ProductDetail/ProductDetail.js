import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import styles from './productDetail.module.scss';
import { addToCart } from '../../reducers/cartReducer';
import productService from '../../service/product';
import Message from '../../Components/Message/Message';
import { addFavorite, deleteFavorite } from '../../reducers/userReducers';

function ProductDetail() {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  let { id: productId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { login, userId, favorites } = user;
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

  const handleShopNowClick = () => {
    let itemData = {
      productId: data.product._id,
      canBeSold: data.product.canBeSold,
      images: data.product.images,
      name: data.product.name,
      price: data.product.price,
      quantity,
    };
    let confirm = window.confirm(
      `다음과 같은 상품을 바로 주문 하시겠습니까?\n${data.product.name} ${quantity}개 ${
        quantity * data.product.price
      }`
    );
    if (confirm) {
      navigate('/checkout', { state: { items: [itemData] } });
    }
  };

  const handleFavoriteClick = (productId) => {
    // 로그인 확인
    if (!login) {
      alert('로그인을 먼저 해주세요!');
      return;
    }
    let favorite = favorites.includes(productId);
    let data = {
      userId,
      productId,
    };
    if (favorite) {
      // favorite를 해제하는 경우
      dispatch(deleteFavorite(data));
    } else {
      // favorite 를 하는 경우
      dispatch(addFavorite(data));
    }
  };

  if (isLoading) {
    return (
      <div className={styles.product}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.product}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }

  const isFavorited = data && favorites && favorites.includes(data.product._id);

  return (
    <div className={styles.product}>
      <section className={styles.container}>
        <div className={styles.imgBox}>
          <img className={styles.productImg} src={data.product.images[0].filePath} alt='product' />
        </div>
        <div className={styles.infoCard}>
          <div className={styles.metaBox}>
            <h1 className={styles.name}>{data.product.name}</h1>
            <h3 className={styles.price}>${data.product.price * quantity}</h3>
            <p className={styles.description}>Description: {data.product.description}</p>
          </div>
          <div className={styles.qtyBox}>
            <div className={styles.btnBox}>
              <button className={styles.qtyBtn} onClick={handleDecrement}>
                -
              </button>
              <input
                className={styles.input}
                type='number'
                onChange={handleQuantityChange}
                value={quantity}
              />
              <button className={styles.qtyBtn} onClick={handleIncrement}>
                +
              </button>
            </div>
          </div>
          <div className={styles.btnCard}>
            <button onClick={() => handleFavoriteClick(data.product._id)} className={styles.favBtn}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill={isFavorited ? '#f45b69' : 'none'}
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='feather feather-heart'
              >
                <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
              </svg>
            </button>
            <button className={styles.cartBtn} onClick={handleCartClick}>
              Add to cart
            </button>
            <button className={styles.shopNowBtn} onClick={handleShopNowClick}>
              Shop now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
