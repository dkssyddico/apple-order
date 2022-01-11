import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../service/user';

function AdminUsers() {
  const { isLoading, isError, data, error } = useQuery('user', async () => {
    let { data } = await userService.getAll();
    return data;
  });
  if (isLoading) {
    return <h1>Now Loading</h1>;
  }
  if (isError) {
    console.log(error.response);
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className='container'>
      <h1>Admin Users</h1>
      <section>
        {data.users &&
          data.users.map((user) => (
            <div key={user._id}>
              <Link to={`/admin/users/${user._id}`}>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.ordersCount}order</span>
              </Link>
            </div>
          ))}
      </section>
    </div>
  );
}

export default AdminUsers;
