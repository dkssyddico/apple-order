import express from 'express';

import { auth } from '../middleware/auth';

const orderRouter = express.Router();

orderRouter.get('/', auth);

export default orderRouter;
