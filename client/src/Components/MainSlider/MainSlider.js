import React from 'react';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import 'swiper/swiper.scss'; // core Swiper
import styles from './MainSlider.module.css';

function MainSlider() {
  return (
    <Swiper modules={[Autoplay]} autoplay={true}>
      <SwiperSlide>
        <div className={styles.imgBox}>
          <img className={styles.slider__img} src='img/1.jpeg' alt='background' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.imgBox}>
          <img className={styles.slider__img} src='img/2.jpeg' alt='background' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={styles.imgBox}>
          <img className={styles.slider__img} src='img/3.png' alt='background' />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default MainSlider;
