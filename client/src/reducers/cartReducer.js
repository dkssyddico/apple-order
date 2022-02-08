import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import cartService from '../service/cart';

const getCartAction = createAction('cart/getCart');
const addToCartAction = createAction('cart/addToCart');
const changeQtyInCartAction = createAction('cart/changeQtyInCart');
const deleteItemInCartAction = createAction('cart/deleteItemInCart');
const refreshCartAction = createAction('cart/refreshCart');

const getCart = createAsyncThunk(getCartAction, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await cartService.getInfo(userId);
    return data;
  } catch (error) {
    console.log(error.response);
    return rejectWithValue(
      error.response.data.message ? error.response.data.message : error.response.data.error.name
    );
  }
});

const addToCart = createAsyncThunk(addToCartAction, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await cartService.addItem(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const changeQty = createAsyncThunk(changeQtyInCartAction, async (userData, { rejectWithValue }) => {
  try {
    const { data } = await cartService.changQty(userData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const deleteItemInCart = createAsyncThunk(
  deleteItemInCartAction,
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await cartService.deleteItem(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const refreshCart = createAsyncThunk(refreshCartAction, async (userId, { rejectWithValue }) => {
  try {
    const { data } = await cartService.refresh(userId);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  items: [],
  error: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.fulfilled]: (state, { payload }) => ({
      items: payload.cart,
    }),
    [getCart.rejected]: (state, { payload }) => ({
      ...state,
      error: payload,
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
