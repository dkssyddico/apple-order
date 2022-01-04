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
  GET_USERS,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  GET_USERS_REFRESH,
  REMOVE_USER,
  REMOVE_USER_SUCCESS,
  REMOVE_USER_FAILURE,
  REMOVE_USER_REFRESH,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILURE,
} from '../actions/types';
import {
  userJoinThunk,
  userLoginThunk,
  userLogoutThunk,
  getAllUsersThunk,
  removeUserThunk,
} from '../actions/userActions';
import { userAPI } from '../service/api';

export const loginUser = userLoginThunk(LOGIN_USER, userAPI.login);
export const logoutUser = userLogoutThunk(LOGOUT_USER, userAPI.logout);
export const joinUser = userJoinThunk(JOIN_USER, userAPI.join);
export const getAllUsers = getAllUsersThunk(GET_USERS, userAPI.getAll);
export const removeUser = removeUserThunk(REMOVE_USER, userAPI.remove);

export const userReducer = (state = {}, action) => {
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
        error: '',
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
        error: '',
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
        error: '',
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

export const getUsersReducer = (
  state = {
    loading: true,
    list: [],
    error: '',
  },
  action
) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...action.payload.users],
      };
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case GET_USERS_REFRESH:
      return {};
    default:
      return state;
  }
};

export const removeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_USER:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case REMOVE_USER_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case REMOVE_USER_REFRESH:
      return {};
    default:
      return state;
  }
};

export const userProfileReducer = (
  state = {
    info: null,
    loading: false,
    error: '',
  },
  action
) => {
  switch (action.type) {
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        info: action.payload,
        loading: false,
      };
    case GET_USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
