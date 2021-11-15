import { productAPI } from '../service/api';
import { ADD_CART } from './types';

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
