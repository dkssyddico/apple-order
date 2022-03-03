import React from 'react';
import { FaAppleAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import productService from '../../service/product';
import Message from '../Message/Message';
import styles from './AdminProductsCard.module.css';

function AdminProductsCard() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminMainCard}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminMainCard}>
        <Message>
          <p>{error.message}</p>
        </Message>
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
