import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { productAPI } from '../../service/api';

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function AdminProducts() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getProducts = async () => {
    try {
      let {
        data: { products },
      } = await productAPI.getAll();
      setProducts(products);
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
    getProducts();
  }, []);

  const handleDelete = (itemName, itemId) => {
    let confirm = window.confirm(`${itemName} 을/를 지우시겠습니까?`);
    if (confirm) {
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
        ) : error ? (
          <h1>{errorMessage}</h1>
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
              {products &&
                products.map((item) => (
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
