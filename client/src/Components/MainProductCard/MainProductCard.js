import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MainProductCard.module.css';

function MainProductCard({ id, image, name, price }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`}>
        <div className={styles.card__container}>
          <div className={styles.card__imgBox}>
            <img className={styles.card__img} src={image} alt='product' />
          </div>
          <h3 className={styles.card__name}>{name}</h3>
          <p className={styles.card__price}>{`$${price}`}</p>
        </div>
      </Link>
    </div>
  );
}

export default MainProductCard;
