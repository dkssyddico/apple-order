import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { userAPI } from '../service/api';

const loginUserAction = createAction('user/loginUser');
const logoutUserAction = createAction('user/logoutUser');

const initialState = {
  username: undefined,
  userId: undefined,
  login: false,
  isAdmin: false,
};

const loginUser = createAsyncThunk(loginUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.login(userInfo);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const logoutUser = createAsyncThunk(logoutUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.logout();
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
    }),
    [logoutUser.fulfilled]: (state) => initialState,
  },
});

export { loginUser, logoutUser };

export default userSlice.reducer;
