import React from 'react';
import { useQuery } from 'react-query';
import productService from '../../service/product';
import ProductCard from '../ProductCard/ProductCard';
import Message from '../Message/Message';
import styles from './AllProducts.module.scss';

function AllProducts() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.products}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.products}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }

  return (
    <section className={styles.products}>
      {data.products.map((item) => (
        <ProductCard
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
