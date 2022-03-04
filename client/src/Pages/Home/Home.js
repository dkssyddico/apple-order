import React from 'react';
import { useQuery } from 'react-query';
import ProductCard from '../../Components/ProductCard/ProductCard';
import Message from '../../Components/Message/Message';
import productService from '../../service/product';
import styles from './Home.module.scss';

function Home() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productService.getAllProducts();
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.home}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.home}>
        <Message>
          <p>{error.message}</p>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to apple order</h1>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptates quisquam aliquid
        atque dolore excepturi!
      </p>
      <h2 className={styles.productsTitle}>Featured Products</h2>
      <div className={styles.productsContainer}>
        {data.products
          .sort((a, b) => b.orderCount - a.orderCount)
          .slice(0, 3)
          .map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              image={product.images[0].filePath}
              name={product.name}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
