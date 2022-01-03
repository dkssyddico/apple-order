import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userAPI } from '../../service/api';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user);
  const {
    loginInfo: { _id: userId },
  } = user;

  const getOrders = async (userId) => {
    try {
      setLoading(true);
      let { data } = await userAPI.getOrder(userId);
      setOrders(data.orders);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders(userId);
  }, [userId]);

  return (
    <div className='container'>
      <h1>Order history</h1>
      <hr />
      <section>
        {orders &&
          orders.map((order) => (
            <div key={order._id}>
              {order.createdAt}
              <Link to={`/orders/${order._id}`}>
                <div>
                  <h2>
                    {order.items.length > 1
                      ? `${order.items[0].name} and ${
                          order.items.length > 2
                            ? `${order.items.length - 1} things`
                            : `${order.items.length - 1} thing`
                        } `
                      : order.items[0].name}
                  </h2>
                  <div>
                    <h3>Order No. {order._id}</h3>
                    <h3>
                      Total Price{' '}
                      {`$${order.items.reduce(
                        (prev, curr) => prev + curr.quantity * curr.price,
                        0
                      )}`}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </section>
    </div>
  );
}

export default OrderHistory;
