import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { userAPI } from '../service/api';

function AdminUserCard() {
  const { isLoading, isError, data, error } = useQuery('users', async () => {
    let { data } = await userAPI.getAll();
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
      <h2>{data.users.length > 1 ? `${data.users.length} users` : `${data.users.length} user`}</h2>
      <button>
        <Link to='/admin/users'>See more</Link>
      </button>
    </div>
  );
}

export default AdminUserCard;
