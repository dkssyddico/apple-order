import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../Components/Loading';
import { getProductsAll } from '../../reducers/productReducers';
import { getAllUsers } from '../../reducers/userReducers';

function AdminMain() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loginInfo } = useSelector((state) => state.user);
  const { list: productsList, loading: productsListLoading } = useSelector(
    (state) => state.productsList
  );
  const { list: usersList, loading: usersListLoading } = useSelector((state) => state.usersList);

  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
    dispatch(getAllUsers());
    dispatch(getProductsAll());
  }, [history, loginInfo, dispatch]);

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
          {productsListLoading ? (
            <Loading />
          ) : (
            <h3>Total: {productsList && productsList.length}</h3>
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
