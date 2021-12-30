import { ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE } from '../actions/types';

export const orderReducer = (
  state = {
    orders: [],
    addOrderSuccess: false,
  },
  action
) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return {
        ...state,
        addOrderSuccess: false,
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        addOrderSuccess: action.payload,
      };
    case ADD_ORDER_FAILURE:
      return { ...state, addOrderSuccess: false, error: action.payload };
    default:
      return state;
  }
};
