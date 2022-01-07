import { removeProductsThunk, updateProductThunk } from '../actions/productsAction';
import {
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  REMOVE_PRODUCT_FAILURE,
  REMOVE_PRODUCT_REFRESH,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
  UPDATE_PRODUCT_REFRESH,
} from '../actions/types';
import { productAPI } from '../service/api';

export const removeProduct = removeProductsThunk(REMOVE_PRODUCT, productAPI.remove);

export const updateProduct = updateProductThunk(UPDATE_PRODUCT, productAPI.update);

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

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UPDATE_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PRODUCT_REFRESH:
      return {};
    default:
      return state;
  }
};
