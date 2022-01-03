import express from 'express';
import { getAll, getOrder, getPersonalOrder } from '../controllers/order';

import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const orderRouter = express.Router();

orderRouter.get('/', auth, isAdmin, getAll);

orderRouter.get('/:orderId', auth, getOrder);

export default orderRouter;
