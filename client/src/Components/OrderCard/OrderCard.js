import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import styles from './OrderCard.module.css';

function OrderCard({ id, items, createdAt }) {
  return (
    <div className={styles.card}>
      <h4 className={styles.date}>{createdAt}</h4>
      <div className={styles.metaContainer}>
        <Link to={`/orders/${id}`}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              {items.length > 1
                ? `${items[0].name} and ${
                    items.length > 2 ? `${items.length - 1} things` : `${items.length - 1} thing`
                  } `
                : items[0].name}
            </h2>
            <p>
              <FaArrowRight />
            </p>
          </div>
          <div className={styles.infoContainer}>
            <div>
              <img
                className={styles.image}
                src={`http://localhost:4000/${items[0].images[0].filePath}`}
                alt='product'
              />
            </div>
            <div className={styles.infoBox}>
              <h3 className={styles.orderNum}>Order No. {id}</h3>
              <p className={styles.price}>
                Total Price{' '}
                {`$${items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}`}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OrderCard;
