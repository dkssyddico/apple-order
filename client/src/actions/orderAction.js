import { userAPI, orderAPI } from '../service/api';
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
} from './types';

export const addOrder = (userId, items) => async (dispatch) => {
  dispatch({ type: ADD_ORDER_REQUEST });
  try {
    const { data } = await userAPI.addOrder(userId, items);
    dispatch({ type: ADD_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: ADD_ORDER_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch({ type: GET_ORDERS_REQUEST });
  try {
    const { data } = await orderAPI.getAll();
    dispatch({ type: GET_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: GET_ORDERS_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
