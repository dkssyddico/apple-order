import express from 'express';
import { changeDeliverStatus, getAll, getOrder } from '../controllers/order.js';
import { auth } from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const orderRouter = express.Router();

orderRouter.get('/', auth, isAdmin, getAll);

orderRouter.get('/:orderId', auth, getOrder);

orderRouter.post('/:orderId/deliverStatus', auth, isAdmin, changeDeliverStatus);

export default orderRouter;
