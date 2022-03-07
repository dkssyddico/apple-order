import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Message from '../../Components/Message/Message';
import ProductCard from '../../Components/ProductCard/ProductCard';
import userService from '../../service/user';
import styles from './Favorites.module.scss';

function Favorites() {
  const user = useSelector((state) => state.user);
  const { userId } = user;
  console.log(user);

  const { isLoading, isError, data, error } = useQuery(['favorites', userId], async () => {
    let { data } = await userService.getFavorite(userId);
    console.log(data);
    return data;
  });

  if (isLoading) {
    return (
      <div className={styles.favorites}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.favorites}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }
  return (
    <div className={styles.favorites}>
      <h2 className={styles.title}>Favorites({data.favorites.length})</h2>
      <div className={styles.container}>
        {data.favorites.map((favorite) => (
          <ProductCard
            key={favorite._id}
            id={favorite._id}
            image={favorite.images[0].filePath}
            name={favorite.name}
            price={favorite.price}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
