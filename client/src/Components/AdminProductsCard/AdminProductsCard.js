import React from 'react';
import { FaAppleAlt } from 'react-icons/fa';
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
      <section className={styles.adminMainCard__titleContainer}>
        <div className={styles.adminMainCard__iconBox}>
          <FaAppleAlt className={styles.adminMainCard__icon} />
        </div>
        <h2 className={styles.adminMainCard__title}>Products</h2>
      </section>
      <section className={styles.adminMainCard__contentContainer}>
        <div className={styles.adminMainCard__contentBox}>
          <h3 className={styles.adminMainCard__contentHead}>Total</h3>
          <span className={styles.adminMainCard__content}>{data.products.length}</span>
        </div>
      </section>
      <button className={styles.adminMainCard__button}>
        <Link to='/admin/products'>See details</Link>
      </button>
    </div>
  );
}

export default AdminProductsCard;
