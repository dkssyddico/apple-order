import { combineReducers } from 'redux';
import productToBeUploaded from './productUploadReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  user,
  productToBeUploaded,
});

export default rootReducer;
