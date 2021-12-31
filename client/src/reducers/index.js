import { combineReducers } from 'redux';
import { getUsersReducer, removeUserReducer, userReducer } from './userReducers';
import { productImagesReducer, productUploadReducer } from './productUploadReducer';
import {
  productsListReducer,
  productRemoveReducer,
  productInfoReducer,
  updateProductReducer,
} from './productReducers';
import { cartReducer } from './cartReducer';
import { checkoutReducer } from './checkoutReducer';
import { orderListReducer, orderReducer } from './orderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  usersList: getUsersReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orderHistory: orderReducer,
  userRemoved: removeUserReducer,
  productImageUpload: productImagesReducer,
  productUpload: productUploadReducer,
  productsList: productsListReducer,
  productRemove: productRemoveReducer,
  productInfo: productInfoReducer,
  updatedProduct: updateProductReducer,
  orderList: orderListReducer,
});

export default rootReducer;
