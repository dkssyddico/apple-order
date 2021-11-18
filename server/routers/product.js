import express from 'express';
import { add, getAll, getInfo, remove, saveImage, update } from '../controllers/product';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const productRouter = express.Router();

productRouter.get('/', getAll);

productRouter.post('/', auth, isAdmin, add);

productRouter.post('/image', auth, isAdmin, saveImage);

productRouter.get('/:id', getInfo);

productRouter.delete('/:id', auth, isAdmin, remove);

productRouter.put('/:id', auth, isAdmin, update);

export default productRouter;
