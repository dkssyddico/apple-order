import { combineReducers } from 'redux';
import {
  getUsersReducer,
  removeUserReducer,
  userProfileReducer,
  userReducer,
} from './userReducers';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  usersList: getUsersReducer,
  userRemoved: removeUserReducer,
  userProfile: userProfileReducer,
  cart: cartReducer,
});

export default rootReducer;
