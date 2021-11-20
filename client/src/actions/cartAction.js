import { productAPI, userAPI } from '../service/api';
import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  ADD_CART_REFRESH,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
} from './types';

export const getCartInfo = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await userAPI.getCartInfo(id);
    console.log(data);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addToCart = (userId, productObj) => async (dispatch, getState) => {
  dispatch({ type: ADD_CART_REQUEST });
  try {
    const response = await userAPI.addItemToCart(userId, productObj);
    console.log(response);
    dispatch({
      type: ADD_CART_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ADD_CART_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
