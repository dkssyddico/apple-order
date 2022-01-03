import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, deleteItem, getCartInfo } from '../../actions/cartAction';
import Loading from '../../Components/Loading';
import Message from '../../Components/Message';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { addToCheckout } from '../../actions/checkoutAction';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const {
    loginInfo: { _id: userId },
  } = user;

  let { items, cartLoading, error } = cart;

  const handleDelete = (productId) => {
    let confirm = window.confirm('해당 상품을 장바구니에서 삭제하시겠습니까?');
    if (confirm) {
      dispatch(deleteItem(userId, productId));
    }
  };

  useEffect(() => {
    dispatch(getCartInfo(userId));
  }, [dispatch, userId]);

  const handleChange = (event, item) => {
    const { value } = event.target;
    let productObj = {
      productId: item.productId,
      quantity: parseInt(value),
    };
    dispatch(changeQuantity(userId, productObj));
  };

  const handleCheckoutClick = () => {
    dispatch(addToCheckout(items));
    navigate('/checkout');
  };

  return (
    <div className='container'>
      <h1>Cart</h1>
      {cartLoading ? (
        <Loading />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div>
          {items.filter((item) => !item.canBeSold).length > 0 ? (
            <Message>삭제해야 하는 아이템이 있습니다.</Message>
          ) : (
            ''
          )}
          <table>
            <thead>
              <tr>
                <th>Product image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remarks</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
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
                      <td>
                        <select
                          disabled={!item.canBeSold}
                          value={item.quantity}
                          onChange={(e) => handleChange(e, item)}
                        >
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
                      <td>{item.remarks}</td>
                      <td>
                        <button onClick={() => handleDelete(item.productId)}>Remove</button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>장바구니에 담긴 아이템이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div>
        <h1>Total price: {items.reduce((a, b) => b.canBeSold && a + b.price * b.quantity, 0)}</h1>
        <h1>Total items: {items ? items.filter((item) => item.canBeSold).length : 0}</h1>
        <button
          onClick={() => handleCheckoutClick()}
          disabled={items.filter((item) => !item.canBeSold).length > 0}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
