import { getProductsThunk, removeProductsThunk } from '../actions/productsAction';
import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILURE,
  REMOVE_PRODUCT_REFRESH,
} from '../actions/types';
import { productAPI } from '../service/api';

export const getProductsAll = getProductsThunk(GET_PRODUCTS, productAPI.getAll);
export const removeProduct = removeProductsThunk(REMOVE_PRODUCT, productAPI.remove);

export const productsListReducer = (state = {}, action) => {
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

export const productRemoveReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REMOVE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case REMOVE_PRODUCT_REFRESH:
      return {};
    default:
      return state;
  }
};
