import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import orderService from '../../service/order';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getOrders = async () => {
    try {
      let {
        data: { orders },
      } = await orderService.getAllOrders();
      setOrders(orders);
    } catch (error) {
      let {
        response: {
          data: { message },
        },
      } = error;
      setError(true);
      setErrorMessage(message ? message : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className='container'>
      <h1>Admin Orders </h1>
      {error && <h1>{errorMessage}</h1>}
      {loading ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
    </div>
  );
}

export default AdminOrders;
