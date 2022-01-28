import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import productService from '../../service/product';
import styles from './AdminProductsCard.module.css';

function AdminProductsCard() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });
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
