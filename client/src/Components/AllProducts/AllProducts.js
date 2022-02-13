import React from 'react';
import { useQuery } from 'react-query';
import productService from '../../service/product';
import MainProductCard from '../MainProductCard/MainProductCard';
import styles from './AllProducts.module.css';

function AllProducts() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.products}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.products}>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  return (
    <section className={styles.products}>
      {data.products.map((item) => (
        <MainProductCard
          key={item._id}
          id={item._id}
          image={item.images[0].filePath}
          name={item.name}
          price={item.price}
        />
      ))}
    </section>
  );
}

export default AllProducts;
