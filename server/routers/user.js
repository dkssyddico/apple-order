import express from 'express';
import {
  addItemToCart,
  getAll,
  getCartInfo,
  join,
  login,
  logout,
  removeUser,
} from '../controllers/user';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const userRouter = express.Router();

userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.get('/logout', auth, logout);

userRouter.get('/', auth, isAdmin, getAll);

userRouter.delete('/:id', auth, isAdmin, removeUser);

// user cart
userRouter.get('/:id/cart', auth, getCartInfo);
userRouter.post('/:id/cart', auth, addItemToCart);

export default userRouter;
