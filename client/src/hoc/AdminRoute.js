import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute({ component: Component, ...rest }) {
  console.log(...rest);
  const { login, isAdmin } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      element={(props) => (login && isAdmin ? <Component {...props} /> : <Navigate to='/login' />)}
    ></Route>
  );
}

export default AdminRoute;
