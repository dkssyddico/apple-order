import express from 'express';
import { add, saveImage } from '../controllers/product';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const productRouter = express.Router();

productRouter.post('/', auth, isAdmin, add);

productRouter.post('/image', auth, isAdmin, saveImage);

export default productRouter;
