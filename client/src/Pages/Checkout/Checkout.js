import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { addOrder } from '../../actions/orderAction';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const {
    loginInfo: { _id: userId },
  } = user;

  const checkout = useSelector((state) => state.checkout);
  const { items } = checkout;

  const orderHistory = useSelector((state) => state.orderHistory);
  const { addOrderSuccess } = orderHistory;

  const handlePaymentClick = () => {
    dispatch(addOrder(userId, items));
  };

  useEffect(() => {
    if (addOrderSuccess) {
      navigate(`/orderSuccess/`);
    }
  });

  return (
    <div className='container'>
      <h1>Checkout</h1>
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
        <button onClick={handlePaymentClick}>Payment</button>
      </div>
    </div>
  );
}

export default Checkout;
