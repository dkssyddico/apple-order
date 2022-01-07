import { combineReducers } from 'redux';
import {
  getUsersReducer,
  removeUserReducer,
  userProfileReducer,
  userReducer,
} from './userReducers';
import { productImagesReducer, productUploadReducer } from './productUploadReducer';
import { productRemoveReducer, productInfoReducer, updateProductReducer } from './productReducers';
import { cartReducer } from './cartReducer';
import { checkoutReducer } from './checkoutReducer';
import { adminOrderReducer, orderHistoryReducer } from './orderReducer';

const rootReducer = combineReducers({
  user: userReducer,
  usersList: getUsersReducer,
  userRemoved: removeUserReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  productImageUpload: productImagesReducer,
  productUpload: productUploadReducer,
  productRemove: productRemoveReducer,
  updatedProduct: updateProductReducer,
  adminOrderList: adminOrderReducer,
  orderHistory: orderHistoryReducer,
});

export default rootReducer;
