import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ component: Component, ...rest }) {
  const { loginInfo } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => (loginInfo ? <Component {...props} /> : <Navigate to='/login' />)}
    ></Route>
  );
}

export default PrivateRoute;
