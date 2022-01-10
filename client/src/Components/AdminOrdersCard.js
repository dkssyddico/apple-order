import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import orderService from '../service/order';

function AdminOrdersCard() {
  const { isLoading, isError, data, error } = useQuery('orders', async () => {
    let { data } = await orderService.getAllOrders();
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
        {data.orders.length > 1 ? `${data.orders.length} orders` : `${data.orders.length} user`}
      </h2>
      <button>
        <Link to='/admin/orders'>See more</Link>
      </button>
    </div>
  );
}

export default AdminOrdersCard;
