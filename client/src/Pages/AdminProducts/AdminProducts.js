import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import productService from '../../service/product';
import styles from './AdminProducts.module.scss';
import Message from '../../Components/Message/Message';
import { clearUser } from '../../reducers/userReducers';

function AdminProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, data, error } = useQuery(
    'adminProducts',
    async () => {
      let { data } = await productService.getAllProducts();
      return data;
    },
    {
      onError: (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('r_token');
          localStorage.removeItem('userInfo');
          dispatch(clearUser());
          navigate('/login');
          toast.error('Login token is expired. Please login again');
        }
      },
    }
  );

  if (isLoading) {
    return (
      <div className={styles.adminProducts}>
        <Message>
          <p>Now Loading...</p>
        </Message>
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.adminProducts}>
        <Message>
          <p>Error: {error.message}</p>
        </Message>
      </div>
    );
  }

  return (
    <div className={styles.adminProducts}>
      <h1 className={styles.title}>Admin Products</h1>
      <button className={styles.uploadBtn}>
        <Link to='/admin/products/upload'>Upload product</Link>
      </button>
      <section className={styles.itemsContainer}>
        <div className={styles.headContainer}>
          <div className={styles.head}>
            <h2>Image</h2>
          </div>
          <div className={styles.head}>
            <h2>Product</h2>
          </div>
          <div className={styles.head}>
            <h2>Price</h2>
          </div>
        </div>
        {data.products.map((item) => (
          <div className={styles.productCard} key={item._id}>
            <div className={styles.content}>
              <img className={styles.image} alt='item' src={item.images[0].filePath} />
            </div>
            <div className={styles.content}>
              <Link to={`/admin/products/${item._id}`}>
                <span>{item.name}</span>
              </Link>
            </div>
            <div className={styles.content}>
              <span>${item.price}</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminProducts;
