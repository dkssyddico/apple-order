import { uploadProductIMGThunk, uploadProductThunk } from '../actions/productUploadAction';
import {
  UPLOAD_PRODUCT,
  UPLOAD_PRODUCT_FAILURE,
  UPLOAD_PRODUCT_SUCCESS,
  UPLOAD_PRODUCT_IMG,
  UPLOAD_PRODUCT_IMG_SUCCESS,
  UPLOAD_PRODUCT_IMG_FAILURE,
} from '../actions/types';
import { productAPI } from '../service/api';

export const uploadProductImg = uploadProductIMGThunk(UPLOAD_PRODUCT_IMG, productAPI.saveImage);
export const uploadProduct = uploadProductThunk(UPLOAD_PRODUCT, productAPI.add);

const productToBeUploaded = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_PRODUCT_IMG:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PRODUCT_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        images: [...state.images, action.payload],
      };
    case UPLOAD_PRODUCT_IMG_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPLOAD_PRODUCT:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    case UPLOAD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productToBeUploaded;
