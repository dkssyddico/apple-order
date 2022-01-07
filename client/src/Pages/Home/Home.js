import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { productAPI } from '../../service/api';

function Home() {
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
    <div className='container'>
      <h1>Welcome to apple order app!</h1>
      <section>
        <h2>Products</h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <h1>{errorMessage}</h1>
        ) : (
          products &&
          products.map((item) => (
            <div key={item._id}>
              <Link to={`/product/${item._id}`}>
                <div className='imgContainer'>
                  <img
                    src={`http://localhost:4000/${item.images[0].filePath}`}
                    width='150px'
                    alt='product'
                  />
                </div>
                <h3>{item.name}</h3>
                <h3>{`$${item.price}`}</h3>
              </Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default Home;
