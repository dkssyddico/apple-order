import { combineReducers } from 'redux';
import user from './userReducer';
import productToBeUploaded from './productUploadReducer';
import products from './productsReducer';

const rootReducer = combineReducers({
  user,
  productToBeUploaded,
  products,
});

export default rootReducer;
