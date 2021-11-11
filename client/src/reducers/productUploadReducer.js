import { uploadProductIMGThunk, uploadProductThunk } from '../actions/productUploadAction';
import {
  UPLOAD_PRODUCT,
  UPLOAD_PRODUCT_FAILURE,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_IMG,
  UPLOAD_PRODUCT_IMG_SUCCESS,
  UPLOAD_PRODUCT_IMG_FAILURE,
  UPLOAD_PRODUCT_IMG_REFRESH,
  UPLOAD_PRODUCT_REFRESH,
} from '../actions/types';
import { productAPI } from '../service/api';

export const uploadProductImg = uploadProductIMGThunk(UPLOAD_PRODUCT_IMG, productAPI.saveImage);
export const uploadProduct = uploadProductThunk(UPLOAD_PRODUCT, productAPI.add);

export const productImagesReducer = (
  state = {
    loading: true,
    images: [],
    success: false,
    error: '',
  },
  action
) => {
  switch (action.type) {
    case UPLOAD_PRODUCT_IMG:
      return { ...state };
    case UPLOAD_PRODUCT_IMG_SUCCESS:
      return { ...state, loading: false, success: true, images: [action.payload] };
    case UPLOAD_PRODUCT_IMG_FAILURE:
      return { ...state, error: action.payload };
    case UPLOAD_PRODUCT_IMG_REFRESH:
      return {
        loading: true,
        images: [],
        error: '',
      };
    default:
      return state;
  }
};

export const productUploadReducer = (
  state = {
    loading: true,
    success: false,
    error: '',
  },
  action
) => {
  switch (action.type) {
    case UPLOAD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: '',
      };
    case UPLOAD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPLOAD_PRODUCT_REFRESH:
      return {
        loading: true,
        images: [],
        success: false,
        error: '',
      };
    default:
      return state;
  }
};
