import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { refreshCart } from '../../reducers/cartReducer';
import orderService from '../../service/order';

function Checkout() {
  const {
    state: { items },
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { userId } = user;
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentClick = () => {
    orderService
      .addOrder(userId, items)
      .then((res) => {
        let {
          data: { success, orderId },
        } = res;
        if (success) {
          navigate('/orderSuccess', { state: { orderId } });
          dispatch(refreshCart(userId));
        }
      })
      .catch((error) => {
        let {
          response: {
            data: { message },
          },
        } = error;
        setError(true);
        setErrorMessage(message ? message : error.message);
      });
  };

  useEffect(() => {
    if (items.length < 1) {
      navigate('/');
    }
  }, [items, navigate]);

  return (
    <div className='container'>
      <h1>Checkout</h1>
      {error && <h1>{errorMessage}</h1>}
      <div>
        <table>
          <thead>
            <tr>
              <th>Product image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => {
                return (
                  <tr key={uuidv4()}>
                    <td>
                      <img
                        style={{ width: '70px' }}
                        src={`http://localhost:4000/${item.images[0].filePath}`}
                        alt='product'
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.canBeSold ? item.price : '0'}</td>
                    <td>{item.quantity}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Total price: {items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}</h1>
        <h1>Total items: {items ? items.filter((item) => item.canBeSold).length : 0}</h1>
        <button onClick={() => handlePaymentClick()}>Payment</button>
      </div>
    </div>
  );
}

export default Checkout;
