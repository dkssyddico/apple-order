import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminMain() {
  const { loginInfo } = useSelector((state) => state.user);
  const { list, loading } = useSelector((state) => state.productsList);
  const history = useHistory();
  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
  }, [history, loginInfo]);
  return (
    <div className='container'>
      <h1>Admin</h1>
      <section>
        <div className='card'>
          <h2>Users</h2>
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
          {!loading && <h3>Total: {list.length}</h3>}
          <button>
            <Link to='/admin/products'>go to products</Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminMain;
