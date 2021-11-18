import { productAPI, userAPI } from '../service/api';
import { ADD_CART, GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE } from './types';

export const getCartInfo = (id) => async (dispatch, getState) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const { data } = await userAPI.getCartInfo(id);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addToCart = (productId, quantity) => async (dispatch, getState) => {
  const {
    data: { product },
  } = await productAPI.getInfo(productId);
  dispatch({
    type: ADD_CART,
    payload: {
      name: product.name,
      price: product.price,
      quantity,
      images: product.images,
      _id: product._id,
    },
  });
  localStorage.setItem('items', JSON.stringify(getState().cart.items));
};
