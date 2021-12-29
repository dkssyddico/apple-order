import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function Checkout() {
  const checkout = useSelector((state) => state.checkout);
  const { items } = checkout;
  console.log(items);
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
        <button>Payment</button>
      </div>
    </div>
  );
}

export default Checkout;
