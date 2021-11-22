import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading';

function Home() {
  const { list, loading } = useSelector((state) => state.productsList);

  return (
    <div className='container'>
      <h1>Welcome to apple order app!</h1>
      <section>
        <h2>Products</h2>
        {loading ? (
          <Loading />
        ) : (
          list &&
          list.map((item) => (
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
