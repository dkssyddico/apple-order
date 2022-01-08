import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { productAPI } from '../../service/api';

const Container = styled.div`
  padding-top: 12vh;
  width: 100%;
  height: 100%;
`;

function AdminProducts() {
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
          <section>
            {products &&
              products.map((item) => (
                <div key={item._id}>
                  <Link to={`/admin/products/${item._id}`}>
                    <div>
                      <div>
                        <img
                          style={{ width: '70px' }}
                          alt='item'
                          src={`http://localhost:4000/${item.images[0].filePath}`}
                        />
                      </div>
                      <div>
                        <span>{item.name}</span>
                        <span>$ {item.price}</span>
                        <span>{item.description}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </section>
        )}
      </div>
    </Container>
  );
}

export default AdminProducts;
