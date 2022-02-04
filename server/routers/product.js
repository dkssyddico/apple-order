import express from 'express';
import {
  add,
  getAll,
  getInfo,
  remove,
  saveImage,
  update,
} from '../controllers/product.js';
import { auth } from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const productRouter = express.Router();

productRouter.get('/', getAll);

productRouter.post('/', auth, isAdmin, add);

productRouter.post('/image', auth, isAdmin, saveImage);

productRouter.get('/:id', getInfo);

productRouter.delete('/:id', auth, isAdmin, remove);

productRouter.put('/:productId', auth, isAdmin, update);

export default productRouter;
