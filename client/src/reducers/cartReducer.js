import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REFRESH,
} from '../actions/types';

export const cartReducer = (
  state = { items: [], cartLoading: true, addItemLoading: false, error: '' },
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
    case ADD_CART_REQUEST:
      return {
        ...state,
        addItemLoading: true,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        addItemLoading: false,
      };
    case ADD_CART_FAILURE:
      return {
        ...state,
        addItemLoading: false,
      };
    default:
      return state;
  }
};

const addItemsInCart = (state, newItem) => {
  const existence = state.items.find((prevItem) => prevItem._id === newItem._id);
  if (existence) {
    return {
      loading: false,
      items: state.items.map((prevItem) => (prevItem._id === newItem._id ? newItem : prevItem)),
    };
  } else {
    return {
      loading: false,
      items: [newItem, ...state.items],
    };
  }
};
