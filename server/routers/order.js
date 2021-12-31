import express from 'express';
import { getAll } from '../controllers/order';

import { auth } from '../middleware/auth';

const orderRouter = express.Router();

orderRouter.get('/', auth, getAll);

export default orderRouter;
