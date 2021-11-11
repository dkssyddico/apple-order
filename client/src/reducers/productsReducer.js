import { getProductsThunk } from '../actions/productsAction';
import { GET_PRODUCTS, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE } from '../actions/types';
import { productAPI } from '../service/api';

export const getProductsAll = getProductsThunk(GET_PRODUCTS, productAPI.getAll);

const products = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...action.payload.products],
      };
    case GET_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default products;
