import { combineReducers } from 'redux';
import {
  getUsersReducer,
  removeUserReducer,
  userProfileReducer,
  userReducer,
} from './userReducers';
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
  adminOrderList: adminOrderReducer,
  orderHistory: orderHistoryReducer,
});

export default rootReducer;
