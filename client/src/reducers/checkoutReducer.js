import { ADD_TO_CHECKOUT } from '../actions/types';

export const checkoutReducer = (
  state = {
    items: [],
  },
  action
) => {
  switch (action.type) {
    case ADD_TO_CHECKOUT:
      return {
        items: [...action.payload],
      };
    default:
      return state;
  }
};