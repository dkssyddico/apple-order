import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { userAPI } from '../service/api';

const getCartAction = createAction('cart/getCart');
const addToCartAction = createAction('cart/addToCart');
const changeQtyInCartAction = createAction('cart/changeQtyInCart');
const deleteItemInCartAction = createAction('cart/deleteItemInCart');
const refreshCartAction = createAction('cart/refreshCart');

const getCart = createAsyncThunk(getCartAction, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.getCartInfo(userId);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const addToCart = createAsyncThunk(addToCartAction, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.addItemToCart(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const changeQty = createAsyncThunk(changeQtyInCartAction, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.changQtyInCart(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deleteItemInCart = createAsyncThunk(
  deleteItemInCartAction,
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.deleteItem(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const refreshCart = createAsyncThunk(refreshCartAction, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await userAPI.refreshCart(userId);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
    [addToCart.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
    [refreshCart.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
    [changeQty.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
    [deleteItemInCart.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
  },
});

export { getCart, addToCart, refreshCart, changeQty, deleteItemInCart };

export default cartSlice.reducer;
