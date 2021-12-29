import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsAll, removeProduct } from '../../reducers/productReducers';
import { REMOVE_PRODUCT_REFRESH } from '../../actions/types';
import Loading from '../../Components/Loading';

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function AdminProducts() {
  const { list, loading } = useSelector((state) => state.productsList);
  const { success: successRemove } = useSelector((state) => state.productRemove);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (successRemove) {
      dispatch({ type: REMOVE_PRODUCT_REFRESH });
    }
    dispatch(getProductsAll());
  }, [dispatch, successRemove]);

  const handleDelete = (itemName, itemId) => {
    let confirm = window.confirm(`${itemName} 을/를 지우시겠습니까?`);
    if (confirm) {
      dispatch(removeProduct(itemId));
    }
  };

  return (
    <Container>
      <h1>AdminProducts</h1>
      <button>
        <Link to='/admin/products/upload'>Upload product</Link>
      </button>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Product Description</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        style={{ width: '70px' }}
                        alt='item'
                        src={`http://localhost:4000/${item.images[0].filePath}`}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>$ {item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <button onClick={() => navigate(`/admin/products/${item._id}/edit`)}>
                        Edit
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(item.name, item._id)}>Remove</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Container>
  );
}

export default AdminProducts;
