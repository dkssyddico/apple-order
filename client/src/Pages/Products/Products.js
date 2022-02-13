import React from 'react';
import AllProducts from '../../Components/AllProducts/AllProducts';
import styles from './Products.module.css';

function Products() {
  return (
    <div className={styles.products}>
      <div className={styles.products__container}>
        <h1 className={styles.products__title}>Products</h1>
        <AllProducts />
      </div>
    </div>
  );
}

export default Products;
