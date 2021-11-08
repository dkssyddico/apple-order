import createRequestThunk from '../lib/createRequestThunk';
import { userAPI } from '../service/api';

// 액션타입
const LOGIN_USER = 'user/LOGIN_USER';
const LOGIN_USER_SUCCESS = 'user/LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'user/LOGIN_USER_FAILURE';

// 액션
export const loginUser = createRequestThunk(LOGIN_USER, userAPI.login);

// reducer
const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        loggedIn: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        userInfo: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default user;
