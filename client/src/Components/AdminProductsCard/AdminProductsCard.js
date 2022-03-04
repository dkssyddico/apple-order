import React from 'react';
import { FaAppleAlt } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import productService from '../../service/product';
import Message from '../Message/Message';
import styles from './AdminProductsCard.module.scss';

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
      <section className={styles.titleContainer}>
        <div className={styles.iconBox}>
          <FaAppleAlt className={styles.icon} />
        </div>
        <h2 className={styles.title}>Products</h2>
      </section>
      <section className={styles.contentContainer}>
        <div className={styles.contentBox}>
          <h3 className={styles.contentHead}>Total</h3>
          <span className={styles.content}>{data.products.length}</span>
        </div>
      </section>
      <button className={styles.button}>
        <Link to='/admin/products'>See details</Link>
      </button>
    </div>
  );
}

export default AdminProductsCard;
