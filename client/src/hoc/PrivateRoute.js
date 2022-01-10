import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
  const { login } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (login ? <Component {...props} /> : <Navigate to='/login' />)}
    ></Route>
  );
}

export default PrivateRoute;
