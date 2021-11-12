import { combineReducers } from 'redux';
import { getUsersReducer, removeUserReducer, userReducer } from './userReducers';
import { productImagesReducer, productUploadReducer } from './productUploadReducer';
import {
  productsListReducer,
  productRemoveReducer,
  productInfoReducer,
  updateProductReducer,
} from './productReducers';

const rootReducer = combineReducers({
  user: userReducer,
  usersList: getUsersReducer,
  userRemoved: removeUserReducer,
  productImageUpload: productImagesReducer,
  productUpload: productUploadReducer,
  productsList: productsListReducer,
  productRemove: productRemoveReducer,
  productInfo: productInfoReducer,
  updatedProduct: updateProductReducer,
});

export default rootReducer;
