import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import rootReducer from './reducers';

const preloadedState = {
  user: {
    joinInfo: null,
    loginInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  productToBeUploaded: {
    images: [],
    info: null,
  },
  products: {
    list: [],
  },
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, ReduxThunk, promiseMiddleware],
  preloadedState,
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
