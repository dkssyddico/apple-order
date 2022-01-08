import { combineReducers } from 'redux';
import {
  getUsersReducer,
  removeUserReducer,
  userProfileReducer,
  userReducer,
} from './userReducers';
import { cartReducer } from './cartReducer';
import { checkoutReducer } from './checkoutReducer';

const rootReducer = combineReducers({
  user: userReducer,
  usersList: getUsersReducer,
  userRemoved: removeUserReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
