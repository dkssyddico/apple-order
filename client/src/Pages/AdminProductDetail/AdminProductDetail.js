import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FileUpload from '../../Components/FileUpload/FileUpload';
import categories from '../../utils/category';
import productService from '../../service/product';
import styles from './AdminProductDetail.module.scss';
import toast from 'react-hot-toast';

function AdminProductDetail() {
  let { productId } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const watchFields = watch();

  const getProduct = async (productId) => {
    try {
      setLoading(true);
      let {
        data: { product },
      } = await productService.getInfo(productId);
      setProduct(product);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      toast.error(message ? message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshImages = (images) => {
    setImages(images);
  };

  useEffect(() => {
    getProduct(productId);
  }, [productId]);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
      });
      setImages(product.images);
    }
  }, [reset, product]);

  const handleEditSubmit = (data) => {
    const { name, category, price, description } = data;
    if (images.length === 0) {
      alert('상품 이미지는 한 개 이상 필요합니다.');
    } else {
      const confirm = window.confirm('업데이트하시겠습니까?');
      if (confirm) {
        const newProduct = {
          name,
          price,
          category,
          description,
          images,
        };
        productService
          .update(productId, newProduct)
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

  const handleDelete = (itemId) => {
    const confirm = window.confirm('상품을 삭제하시겠습니까?');
    if (confirm) {
      productService
        .remove(itemId)
        .then((res) => {
          let {
            data: { success },
          } = res;
          if (success) {
            navigate('/admin/products');
            toast.success('Product was successfully deleted!');
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
  };

  return (
    <div className='container'>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.adminProductDetail}>
          <h1 className={styles.title}>Product Detail</h1>
          <FileUpload originalImages={images} refreshImages={refreshImages} />
          <div className={styles.infoContainer}>
            <form className={styles.form} onSubmit={handleSubmit(handleEditSubmit)}>
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
                  <p className={styles.warning}>9999 이상의 가격을 입력할 수 없습니다.</p>
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
                  name='price'
                  type='number'
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
                  Edit
                </button>
                <p className={styles.deleteBtn} onClick={() => handleDelete(productId)}>
                  Delete
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductDetail;
