import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../Components/Loading';
import { getAllUsers } from '../../reducers/userReducers';
import { useState } from 'react';
import { productAPI } from '../../service/api';

function AdminMain() {
  const dispatch = useDispatch();
  const { list: usersList, loading: usersListLoading } = useSelector((state) => state.usersList);
  const [productListLoading, setProductListLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsError, setProductsError] = useState(false);
  const [productsErrorMessage, setProductsErrorMessage] = useState('');

  const getProducts = async () => {
    try {
      let {
        data: { products },
      } = await productAPI.getAll();
      setProducts(products);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      setProductsError(true);
      setProductsErrorMessage(message ? message : error.message);
    } finally {
      setProductListLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className='container'>
      <h1>Admin</h1>
      <section>
        <div className='card'>
          <h2>Users</h2>
          {usersListLoading ? <Loading /> : <h3>Total users: {usersList && usersList.length}</h3>}
          <button>
            <Link to='/admin/users'>go to users</Link>
          </button>
        </div>
        <div className='card'>
          <h2>Orders</h2>
          <button>
            <Link to='/admin/orders'>go to orders</Link>
          </button>
        </div>
        <div className='card'>
          <h2>Products</h2>
          {productListLoading ? (
            <Loading />
          ) : productsError ? (
            <h1>{productsErrorMessage}</h1>
          ) : (
            <h3>Total: {products && products.length}</h3>
          )}
          <button>
            <Link to='/admin/products'>go to products</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminMain;
