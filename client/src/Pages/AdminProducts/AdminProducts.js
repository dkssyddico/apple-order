import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsAll } from '../../reducers/productsReducer';

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function AdminProducts() {
  const { loginInfo } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.products);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginInfo || !loginInfo.isAdmin) {
      alert('관리자만 들어올 수 있습니다.');
      history.push('/');
    }
    dispatch(getProductsAll());
  }, [history, loginInfo, dispatch]);

  return (
    <Container>
      <h1>AdminProducts</h1>
      <button>
        <Link to='/admin/products/upload'>Upload product</Link>
      </button>
      <div>
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
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Remove</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default AdminProducts;
