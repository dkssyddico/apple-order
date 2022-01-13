import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from './Components/GlobalStyles';
import Router from './Components/Router';
import { getCart } from './reducers/cartReducer';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { login, userId } = user;

  useEffect(() => {
    if (login) {
      dispatch(getCart(userId));
    }
  }, [dispatch, login, userId]);

  return (
    <>
      <div className='container'>
        <GlobalStyles />
        <Router />
      </div>
    </>
  );
}

export default App;
