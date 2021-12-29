import { ADD_TO_CHECKOUT } from './types';

export const addToCheckout = (cartItems) => (dispatch) => {
  dispatch({ type: ADD_TO_CHECKOUT, payload: cartItems });
};
