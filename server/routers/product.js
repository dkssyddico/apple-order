import express from 'express';
import { add, getAll, remove, saveImage } from '../controllers/product';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const productRouter = express.Router();

productRouter.get('/', auth, isAdmin, getAll);

productRouter.post('/', auth, isAdmin, add);

productRouter.post('/image', auth, isAdmin, saveImage);

productRouter.delete('/:id', auth, isAdmin, remove);

export default productRouter;
