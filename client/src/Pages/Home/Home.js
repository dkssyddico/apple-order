import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeProductCard from '../../Components/HomeProductCard/HomeProductCard';
import MainSlider from '../../Components/MainSlider/MainSlider';
import { clearUser } from '../../reducers/userReducers';
import productService from '../../service/product';
import styles from './Home.module.css';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isError, data, error } = useQuery(
    'products',
    async () => {
      let { data } = await productService.getAllProducts();
      return data;
    },
    {
      onError: (error) => {
        const { status } = error.response;
        if (status === 401) {
          alert(
            error.response.data.message
              ? error.response.data.message
              : error.response.data.error.name
          );
          navigate('/login'); // 리프레쉬 토큰이 만료된 경우 새로 로그인 유도.
          localStorage.removeItem('r_token');
          dispatch(clearUser());
        }
      },
    }
  );

  if (isLoading) {
    return (
      <div className={styles.home}>
        <p>Now Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.home}>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <section className={styles.home__slider}>
        <MainSlider />
      </section>
      <section className={styles.home__introduction}>
        <div className={styles.introduction__container}>
          <h1 className={styles.introduction__title}>Welcome to apple order</h1>
          <p className={styles.introduction__description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptates quisquam
            aliquid atque dolore excepturi!
          </p>
          <h2 className={styles.products__title}>Featured Products</h2>
          <div className={styles.products__container}>
            {data.products
              .sort((a, b) => b.orderCount - a.orderCount)
              .slice(0, 3)
              .map((product) => (
                <HomeProductCard
                  key={product._id}
                  id={product._id}
                  image={product.images[0].filePath}
                  name={product.name}
                  price={product.price}
                />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
