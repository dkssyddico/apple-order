import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../actions/orderAction';

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
          <>
            <p>{order._id}</p>
            <p>{order.createdAt}</p>
          </>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
