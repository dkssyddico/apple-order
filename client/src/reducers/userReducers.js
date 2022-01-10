import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import httpClient from '../service/httpClient';
import userService from '../service/user';

const loginUserAction = createAction('user/loginUser');
const logoutUserAction = createAction('user/logoutUser');

const initialState = {
  username: undefined,
  userId: undefined,
  login: false,
  isAdmin: false,
  accessToken: undefined,
};

const loginUser = createAsyncThunk(loginUserAction, async (userInfo, { rejectWithValue }) => {
  const { data } = await userService.login(userInfo);
  console.log(data);
  const accessToken = data.accessToken;
  if (data.success) {
    httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  } else {
    return rejectWithValue(data.success);
  }
  return data;
});

const logoutUser = createAsyncThunk(logoutUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.logout();
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
      ...state,
      username: payload.username,
      userId: payload.id,
      isAdmin: payload.isAdmin,
      login: true,
      accessToken: payload.accessToken,
    }),
    [logoutUser.fulfilled]: (state) => initialState,
  },
});

export { loginUser, logoutUser };

export default userSlice.reducer;
