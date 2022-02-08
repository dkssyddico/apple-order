import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import logger from 'redux-logger';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import rootReducer from './reducers';

const queryClient = new QueryClient({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, ReduxThunk, promiseMiddleware],
});

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
