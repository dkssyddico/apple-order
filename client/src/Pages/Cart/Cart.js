import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, deleteItem } from '../../actions/cartAction';
import Loading from '../../Components/Loading';
import Message from '../../Components/Message';
import { v4 as uuidv4 } from 'uuid';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { items, loading, error } = cart;

  const user = useSelector((state) => state.user);
  const {
    loginInfo: { _id: userId },
  } = user;

  const handleDelete = (productId, quantity) => {
    let confirm = window.confirm('해당 상품을 장바구니에서 삭제하시겠습니까?');
    if (confirm) {
      dispatch(deleteItem(userId, productId));
    }
  };

  const handleChange = (event, item) => {
    const { value } = event.target;
    let productObj = {
      productId: item.productId,
      quantity: parseInt(value),
    };
    dispatch(changeQuantity(userId, productObj));
  };

  return (
    <div className='container'>
      <h1>Cart</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Product image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((item) => (
                  <tr key={uuidv4()}>
                    <td>
                      <img
                        style={{ width: '70px' }}
                        src={`http://localhost:4000/${item.images[0].filePath}`}
                        alt='product'
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <select value={item.quantity} onChange={(e) => handleChange(e, item)}>
                        <option key={1} value={1}>
                          1
                        </option>
                        <option key={2} value={2}>
                          2
                        </option>
                        <option key={3} value={3}>
                          3
                        </option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.productId, item.quantity)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <h1>Total price: {items.reduce((a, b) => a + b.price * b.quantity, 0)}</h1>
        <h1>Total items: {items ? items.length : 0}</h1>
        <button>Proceed to checkout</button>
      </div>
    </div>
  );
}

export default Cart;
