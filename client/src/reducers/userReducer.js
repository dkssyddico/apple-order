import {
  LOGIN_USER,
  LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILURE,
  JOIN_USER,
  JOIN_USER_SUCCESS,
  JOIN_USER_FAILURE,
} from '../actions/types';
import { userJoinThunk, userLoginThunk, userLogoutThunk } from '../actions/userActions';
import { userAPI } from '../service/api';

export const loginUser = userLoginThunk(LOGIN_USER, userAPI.login);
export const logoutUser = userLogoutThunk(LOGOUT_USER, userAPI.logout);
export const joinUser = userJoinThunk(JOIN_USER, userAPI.join);

const user = (state = {}, action) => {
  switch (action.type) {
    case JOIN_USER:
      return {
        ...state,
        loading: true,
      };
    case JOIN_USER_SUCCESS:
      return {
        ...state,
        joinInfo: action.payload,
        loading: false,
      };
    case JOIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loginInfo: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loginInfo: null,
      };
    case LOGOUT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default user;
