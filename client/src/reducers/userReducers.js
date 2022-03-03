import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import httpClient from '../service/httpClient';
import userService from '../service/user';

const loginUserAction = createAction('user/loginUser');
const checkUserLoginAction = createAction('user/checkLogin');
const logoutUserAction = createAction('user/logoutUser');
const changeProfileAction = createAction('user/changeProfile');

const initialState = {
  username: undefined,
  userId: undefined,
  login: false,
  isAdmin: false,
  error: null,
};

const loginUser = createAsyncThunk(loginUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(userInfo);
    console.log(data);
    const accessToken = data.accessToken;
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('r_token', true);
    return data;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

const checkUserLogin = createAsyncThunk(checkUserLoginAction, async (_, { rejectWithValue }) => {
  try {
    const { data } = await userService.checkLogin();
    const accessToken = data.accessToken;
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('r_token', true);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response);
  }
});

const changeProfile = createAsyncThunk(
  changeProfileAction,
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await userService.changeUsername(userInfo);
      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

const logoutUser = createAsyncThunk(logoutUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.logout();
    localStorage.removeItem('r_token');
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => initialState,
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => ({
      username: payload.username,
      userId: payload._id,
      isAdmin: payload.isAdmin,
      login: true,
      error: '',
    }),
    [loginUser.rejected]: (state, { payload }) => {
      console.log(payload);
      return {
        ...state,
        error: payload,
      };
    },
    [checkUserLogin.fulfilled]: (state, { payload }) => ({
      username: payload.username,
      userId: payload._id,
      isAdmin: payload.isAdmin,
      login: true,
      error: '',
    }),
    [checkUserLogin.rejected]: (state, { payload }) => {
      return {
        ...state,
        error: payload,
      };
    },
    [logoutUser.fulfilled]: (state) => initialState,
    [logoutUser.rejected]: (state) => initialState,
    [changeProfile.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        username: payload.username,
      };
    },
    [changeProfile.rejected]: (state, { payload }) => {
      return { ...state, error: payload };
    },
  },
});

export const { clearUser } = userSlice.actions;
export { loginUser, logoutUser, checkUserLogin, changeProfile };

export default userSlice.reducer;
