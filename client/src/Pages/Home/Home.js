import React from 'react';
import Products from '../../Components/Products/Products';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to apple order!</h1>
      <section className={styles.productsContainer}>
        <h2 className={styles.productsTitle}>Products</h2>
        <div className={styles.bar}></div>
        <Products />
      </section>
    </div>
  );
}

export default Home;
