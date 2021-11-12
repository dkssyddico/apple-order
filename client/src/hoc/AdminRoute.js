import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AdminRoute({ component: Component, ...rest }) {
  const { loginInfo } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        loginInfo && loginInfo.isAdmin ? <Component {...props} /> : <Redirect to='/login' />
      }
    ></Route>
  );
}

export default AdminRoute;
