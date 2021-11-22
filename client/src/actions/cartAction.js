import { userAPI } from '../service/api';
import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  GET_CART_FAILURE,
  CHANGE_ITEM_QUANTITY,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from './types';

export const getCartInfo = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await userAPI.getCartInfo(id);
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

export const addToCart = (userId, productObj) => async (dispatch) => {
  dispatch({ type: ADD_CART_REQUEST });
  try {
    const { data } = await userAPI.addItemToCart(userId, productObj);
    dispatch({
      type: ADD_CART_SUCCESS,
      payload: data.cart,
    });
  } catch (error) {
    dispatch({
      type: ADD_CART_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const changeQuantity = (userId, productObj) => {
  return async (dispatch) => {
    const { data } = await userAPI.changQtyInCart(userId, productObj);
    dispatch({
      type: CHANGE_ITEM_QUANTITY,
      payload: data.cart,
    });
  };
};

export const deleteItem = (userId, productId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ITEM_REQUEST });
    const { data } = await userAPI.deleteItem(userId, productId);
    try {
      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: data.cart,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ITEM_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
