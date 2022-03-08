import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import httpClient from '../service/httpClient';
import userService from '../service/user';

const loginUserAction = createAction('user/loginUser');
const checkUserLoginAction = createAction('user/checkLogin');
const logoutUserAction = createAction('user/logoutUser');
const changeProfileAction = createAction('user/changeProfile');
const addFavoriteAction = createAction('user/addProductFavorite');
const deleteFavoriteAction = createAction('user/deleteProductFavorite');

const userInfo = localStorage.getItem('userInfo');

const initialState = userInfo
  ? JSON.parse(userInfo)
  : {
      username: undefined,
      userId: undefined,
      login: false,
      isAdmin: false,
      error: null,
      favorites: undefined,
      accessToken: undefined,
    };

const loginUser = createAsyncThunk(loginUserAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.login(userInfo);
    const accessToken = data.accessToken;
    let dataForLS = {
      username: data.username,
      userId: data._id,
      login: true,
      isAdmin: data.isAdmin,
      error: null,
      favorites: data.favorites,
      accessToken: data.accessToken,
    };
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('userInfo', JSON.stringify(dataForLS));
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
    let dataForLS = {
      username: data.username,
      userId: data._id,
      login: true,
      isAdmin: data.isAdmin,
      error: null,
      favorites: data.favorites,
      accessToken: data.accessToken,
    };
    if (data.success) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
    localStorage.setItem('userInfo', JSON.stringify(dataForLS));
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
    localStorage.removeItem('userInfo');
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response);
  }
});

const addFavorite = createAsyncThunk(addFavoriteAction, async (userInfo, { rejectWithValue }) => {
  try {
    const { data } = await userService.addFavorite(userInfo);
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(error.response);
  }
});

const deleteFavorite = createAsyncThunk(
  deleteFavoriteAction,
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await userService.deleteFavorite(userInfo);
      return data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response);
    }
  }
);

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
      favorites: payload.favorites,
      accessToken: payload.accessToken,
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
      favorites: payload.favorites,
      accessToken: payload.accessToken,
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
    [addFavorite.fulfilled]: (state, { payload }) => ({
      ...state,
      favorites: payload.favorites,
    }),
    [addFavorite.rejected]: (state, { payload }) => {
      return { ...state, error: payload };
    },
    [deleteFavorite.fulfilled]: (state, { payload }) => ({
      ...state,
      favorites: payload.favorites,
    }),
    [deleteFavorite.rejected]: (state, { payload }) => {
      return { ...state, error: payload };
    },
  },
});

export const { clearUser } = userSlice.actions;
export { loginUser, logoutUser, checkUserLogin, changeProfile, addFavorite, deleteFavorite };

export default userSlice.reducer;
