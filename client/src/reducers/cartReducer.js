import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  REFRESH_CART_REQUEST,
  REFRESH_CART_SUCCESS,
  REFRESH_CART_FAILURE,
  CHANGE_ITEM_QUANTITY,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../actions/types';

export const cartReducer = (
  state = {
    items: [],
    cartLoading: true,
    addItemLoading: false,
    changeQtyLoading: false,
    deleteLoading: false,
    refreshLoading: false,
    error: '',
  },
  action
) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        ...state,
        cartLoading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        items: action.payload.cart,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        cartLoading: false,
        error: action.payload,
      };
    case REFRESH_CART_REQUEST:
      return {
        ...state,
        refreshLoading: true,
      };
    case REFRESH_CART_SUCCESS:
      return {
        ...state,
        refreshLoading: false,
        items: action.payload,
      };
    case REFRESH_CART_FAILURE:
      return {
        ...state,
        refreshLoading: false,
        error: action.payload,
      };
    case ADD_CART_REQUEST:
      return {
        ...state,
        addItemLoading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        items: action.payload,
        addItemLoading: false,
      };
    case ADD_CART_FAILURE:
      return {
        ...state,
        addItemLoading: false,
        error: action.payload,
      };
    case CHANGE_ITEM_QUANTITY:
      return {
        ...state,
        items: action.payload,
      };
    case DELETE_ITEM_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: '',
      };
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        items: action.payload,
        deleteLoading: false,
      };
    case DELETE_ITEM_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
