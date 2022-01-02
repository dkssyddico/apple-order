import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';

function AdminOrders() {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders } = orderList;

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div className='container'>
      <h1>Admin Orders </h1>
      <div>
        {orders.map((order) => (
          <div key={order._id}>
            <div>
              <Link to={`/admin/orders/${order._id}`}>
                <p>{order._id}</p>
              </Link>
            </div>
            <div>
              <p>{order.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
