import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../../reducers/userReducers';
import productService from '../../service/product';
import styles from './AdminProductsCard.module.css';

function AdminProductsCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data, error } = useQuery(
    'products',
    async () => {
      let { data } = await productService.getAllProducts();
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
      <div className={styles.adminMainCard}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminMainCard}>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminMainCard}>
      <h2 className={styles.adminMainCard__title}>Products</h2>
      <h3>
        {data.products.length > 1
          ? `${data.products.length} products`
          : `${data.products.length} product`}
      </h3>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/products'>See more</Link>
      </button>
    </div>
  );
}

export default AdminProductsCard;
