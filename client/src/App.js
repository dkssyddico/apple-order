import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartInfo } from './actions/cartAction';
import GlobalStyles from './Components/GlobalStyles';
import Router from './Components/Router';
import { getProductsAll } from './reducers/productReducers';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loginInfo } = user;

  useEffect(() => {
    if (loginInfo && loginInfo.success) {
      dispatch(getCartInfo(loginInfo._id));
    }
  }, [dispatch, loginInfo]);

  useEffect(() => {
    dispatch(getProductsAll());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
