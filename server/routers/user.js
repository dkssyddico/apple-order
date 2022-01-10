import express from 'express';
import {
  addItemToCart,
  addOrder,
  changePassword,
  changeQuantityInCart,
  changeUsername,
  deleteItem,
  getAll,
  getCartInfo,
  getOrders,
  getUserInfo,
  join,
  login,
  logout,
  refreshCart,
  removeUser,
} from '../controllers/user';
import { auth } from '../middleware/auth';
import { checkByRefreshToken } from '../middleware/checkByRefreshToken';
import isAdmin from '../middleware/isAdmin';

const userRouter = express.Router();

userRouter.get('/', auth, isAdmin, getAll);
userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.get('/logout', auth, logout);
userRouter.get('/refresh', checkByRefreshToken);

userRouter.get('/:userId', auth, getUserInfo);

userRouter.put('/:userId/username', auth, changeUsername);

userRouter.put('/:userId/password', auth, changePassword);

userRouter.delete('/:id', auth, isAdmin, removeUser);

// user cart
userRouter.get('/:id/cart', auth, getCartInfo);
userRouter.post('/:id/cart', auth, addItemToCart);
userRouter.put('/:id/cart', auth, changeQuantityInCart);
userRouter.delete('/:userId/cart', auth, refreshCart);
userRouter.delete('/:id/cart/:productId', auth, deleteItem);

// user order
userRouter.get('/:userId/orders', auth, getOrders);
userRouter.post('/:userId/orders', auth, addOrder);

export default userRouter;
