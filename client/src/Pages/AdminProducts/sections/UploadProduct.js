import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UploadProduct.module.css';
import { useForm } from 'react-hook-form';
import categories from '../../../utils/category';
import productService from '../../../service/product';
import FileUpload from '../../../Components/FileUpload/FileUpload';
import toast from 'react-hot-toast';

function UploadProduct() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const watchFields = watch();

  const handleUploadSubmit = (data) => {
    const { name, category, price, description } = data;
    if (images.length === 0) {
      alert('상품 이미지는 한 개 이상 필요합니다.');
    } else {
      let confirm = window.confirm('상품 등록 하시겠습니까?');
      if (confirm) {
        const newProduct = {
          name,
          price,
          category,
          description,
          images,
        };
        productService
          .add(newProduct)
          .then((res) => {
            let {
              data: { success },
            } = res;
            if (success) {
              navigate('/admin/products');
              toast.success('Product was successfully updated!');
            }
          })
          .catch((error) => {
            let {
              response: {
                data: { message },
              },
            } = error;
            toast.error(message ? message : error.message);
          });
      }
    }
  };

  const refreshImages = (images) => {
    setImages(images);
  };

  return (
    <div className='container'>
      <h1 className={styles.title}>Upload product</h1>
      <FileUpload originalImages={images} refreshImages={refreshImages} />
      <div className={styles.infoContainer}>
        <form className={styles.form} onSubmit={handleSubmit(handleUploadSubmit)}>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor='name'>
              Name
            </label>
            {watchFields.name && watchFields.name.length < 2 && (
              <p className={styles.warning}>2글자 이상 입력하세요</p>
            )}
            <input
              className={styles.input}
              {...register('name', {
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력하세요.',
                },
                required: true,
              })}
              type='text'
              name='name'
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor='category'>
              Category
            </label>
            <select
              className={styles.select}
              name='category'
              {...register('category', {
                required: true,
              })}
            >
              {categories.map((item) => {
                return (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor='price'>
              Price($)
            </label>
            {watchFields.price && watchFields.price < 1 && (
              <p className={styles.warning}>1이상의 가격을 입력하세요</p>
            )}
            {watchFields.price && watchFields.price > 9999 && (
              <p>9999 이상의 가격을 입력할 수 없습니다.</p>
            )}
            <input
              className={`${styles.input} priceInput`}
              {...register('price', {
                min: {
                  value: 1,
                  message: '상품 가격은 1달러 이상 입력하세요.',
                },
                max: {
                  value: 9999,
                  message: '상품 가격은 9999 달러를 초과할 수 없습니다.',
                },
                required: true,
              })}
              type='number'
              name='price'
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor='description'>
              Description
            </label>
            {watchFields.description && watchFields.description.length < 2 && (
              <p className={styles.warning}>2글자 이상 입력하세요</p>
            )}
            <textarea
              className={styles.input}
              {...register('description', {
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력하세요.',
                },
                required: true,
              })}
              name='description'
            />
          </div>
          <div className={styles.btnContainer}>
            <button
              className={styles.submitBtn}
              disabled={!isValid || images.length === 0}
              type='submit'
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadProduct;
