import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orderAPI } from '../../service/api';
import { v4 as uuidv4 } from 'uuid';

function AdminOrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getOrder = async (orderId) => {
    try {
      setLoading(true);
      let { data } = await orderAPI.getOrder(orderId);
      setOrder(data.order);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder(orderId);
  }, [orderId]);

  return (
    <div className='container'>
      <h1>Order Detail</h1>
      {loading ? (
        <h1>Now Loading</h1>
      ) : (
        <div>
          <div>
            <h3>Order No. {order._id}</h3>
            <h3>Order Date {order.createdAt}</h3>
            <h3>
              Total price:
              {`$ ${
                order.items &&
                order.items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
              }`}
            </h3>
          </div>
          <div>
            {order.items &&
              order.items.map((item) => {
                return (
                  <div key={uuidv4()}>
                    <Link to={`/product/${item.productId}`}>
                      <div>
                        <h4>{item.name}</h4>
                        <p>
                          {item.quantity * item.price} | {item.quantity}ea
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrderDetail;
