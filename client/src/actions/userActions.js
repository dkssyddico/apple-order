import { userAPI } from '../service/api';
import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_REQUEST,
} from './types';

export function userLoginThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
      dispatch({
        type: SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}

export function userLogoutThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
      dispatch({
        type: SUCCESS,
        payload: data,
      });
      localStorage.removeItem('userInfo');
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}

export function getAllUsersThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
      dispatch({
        type: SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}

export function removeUserThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type });
    try {
      const { data } = await request(params);
      dispatch({
        type: SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
}

export const getUserProfile = (userId) => async (dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    let { data } = await userAPI.getProfile(userId);
    dispatch({
      type: GET_USER_PROFILE_SUCCESS,
      payload: data.info,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
