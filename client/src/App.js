import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GlobalStyles from './Components/GlobalStyles';
import Router from './Components/Router';
import { authUser } from './modules/user';
import { userAPI } from './service/api';

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <GlobalStyles />
      <Router />
    </>
  );
}

export default App;
