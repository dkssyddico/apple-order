import { ADD_CART, ADD_CART_REFRESH } from '../actions/types';

export const cartReducer = (state = { items: [] }, action) => {
  switch (action.type) {
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
