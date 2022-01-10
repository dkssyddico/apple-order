import { combineReducers } from 'redux';
import userReducer from './userReducers';
import { cartReducer } from './cartReducer';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default rootReducer;
