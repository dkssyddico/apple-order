import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from '../actions/types';

export const orderHistoryReducer = (
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

export const adminOrderReducer = (
  state = {
    orders: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
      };
    case GET_ORDERS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
