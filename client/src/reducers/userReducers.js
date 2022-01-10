import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import httpClient from '../service/httpClient';
import userService from '../service/user';

const loginUserAction = createAction('user/loginUser');
const refreshUserAction = createAction('user/refreshUser');
const logoutUserAction = createAction('user/logoutUser');

const initialState = {
  username: undefined,
  userId: undefined,
  login: false,
  isAdmin: false,
  error: '',
};

const loginUser = createAsyncThunk(loginUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(userInfo);
    const accessToken = data.accessToken;
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('r_token', true);
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response.data);
  }
});

const refreshUser = createAsyncThunk(refreshUserAction, async (thunkApi) => {
  try {
    const { data } = await userService.refresh();
    const accessToken = data.accessToken;
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('r_token', true);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const logoutUser = createAsyncThunk(logoutUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.logout();
    localStorage.removeItem('r_token');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => ({
      username: payload.username,
      userId: payload._id,
      isAdmin: payload.isAdmin,
      login: true,
      error: '',
    }),
    [loginUser.rejected]: (state, { payload }) => ({
      ...state,
      error: payload.message,
    }),
    [refreshUser.fulfilled]: (state, { payload }) => ({
      username: payload.username,
      userId: payload._id,
      isAdmin: payload.isAdmin,
      login: true,
      error: '',
    }),
    [refreshUser.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
    }),
    [logoutUser.fulfilled]: (state) => initialState,
  },
});

export { loginUser, logoutUser, refreshUser };

export default userSlice.reducer;
