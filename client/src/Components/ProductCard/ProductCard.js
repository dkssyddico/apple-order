import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';

function ProductCard({ id, image, name, price }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <div className={styles.container}>
          <div className={styles.imgBox}>
            <div className={styles.scale}>
              <img src={image} className={styles.img} alt='product' />
            </div>
          </div>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{`$${price}`}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
