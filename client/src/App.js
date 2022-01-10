import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartInfo } from './actions/cartAction';
import GlobalStyles from './Components/GlobalStyles';
import Router from './Components/Router';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { login, userId } = user;

  useEffect(() => {
    if (login) {
      dispatch(getCartInfo(userId));
    }
  }, [dispatch, login, userId]);

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
