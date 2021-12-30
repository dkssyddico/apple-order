import { ADD_TO_CHECKOUT, REFRESH_CHECKOUT } from '../actions/types';

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
    case REFRESH_CHECKOUT:
      return {
        items: [],
      };
    default:
      return state;
  }
};
