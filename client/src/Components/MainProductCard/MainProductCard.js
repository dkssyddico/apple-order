import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainProductCard.module.css';

function MainProductCard({ id, image, name, price }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src={image} alt="product" />
        </div>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{`$${price}`}</p>
      </Link>
    </div>
  );
}

export default MainProductCard;
