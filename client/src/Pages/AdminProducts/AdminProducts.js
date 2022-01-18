import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import productService from '../../service/product';
import styles from './AdminProducts.module.css';

function AdminProducts() {
  const { isLoading, isError, data, error } = useQuery('adminProducts', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.adminProducts}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminProducts}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.adminProducts}>
      <h1 className={styles.title}>Admin Products</h1>
      <div className={styles.btnContainer}>
        <button>
          <Link to='/admin/products/upload'>Upload product</Link>
        </button>
      </div>
      <section>
        <div className={styles.headContainer}>
          <div className={styles.head}>
            <h2>Image</h2>
          </div>
          <div className={styles.head}>
            <h2>Product</h2>
          </div>
          <div className={styles.head}>
            <h2>Price</h2>
          </div>
          <div className={styles.head}>
            <h2>Description</h2>
          </div>
          <div className={styles.head}>
            <h2></h2>
          </div>
        </div>
        {data.products.map((item) => (
          <div className={styles.productCard} key={item._id}>
            <div className={styles.content}>
              <img
                className={styles.image}
                alt='item'
                src={`http://localhost:4000/${item.images[0].filePath}`}
              />
            </div>
            <div className={styles.content}>
              <span>{item.name}</span>
            </div>
            <div className={styles.content}>
              <span>${item.price}</span>
            </div>
            <div className={styles.content}>
              <span>{item.description.slice(0, 10)}</span>
            </div>
            <div className={styles.content}>
              <Link to={`/admin/products/${item._id}`}>
                <button className={styles.detailBtn}>Detail</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminProducts;
