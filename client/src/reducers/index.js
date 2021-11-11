import { combineReducers } from 'redux';
import user from './userReducer';
import productToBeUploaded from './productUploadReducer';
import { productsListReducer, productRemoveReducer } from './productReducers';

const rootReducer = combineReducers({
  user,
  productToBeUploaded,
  productsList: productsListReducer,
  productRemove: productRemoveReducer,
});

export default rootReducer;
