import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { productAPI } from '../service/api';

function AdminProductsCard() {
  const { isLoading, isError, data, error } = useQuery('products', async () => {
    let { data } = await productAPI.getAll();
    return data;
  });
  if (isLoading) {
    return <h1>Now Loading</h1>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <h2>
        {data.products.length > 1
          ? `${data.products.length} products`
          : `${data.products.length} product`}
      </h2>
      <button>
        <Link to='/admin/products'>See more</Link>
      </button>
    </div>
  );
}

export default AdminProductsCard;
