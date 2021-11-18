import {
  ADD_CART,
  ADD_CART_REFRESH,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  GET_CART_REFRESH,
} from '../actions/types';

export const cartReducer = (state = { items: [], loading: true, error: '' }, action) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload.cart,
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CART:
      return addItemsInCart(state, action.payload);
    case ADD_CART_REFRESH:
      return {};
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
