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
  checkUserLogin,
  addFavorite,
  deleteFavorite,
} from '../controllers/user.js';
import { auth } from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const userRouter = express.Router();

userRouter.get('/', auth, isAdmin, getAll);
userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.get('/logout', auth, logout);
userRouter.get('/checkLogin', checkUserLogin);

userRouter.get('/:userId', auth, getUserInfo);

userRouter.put('/:userId/username', auth, changeUsername);
userRouter.put('/:userId/password', auth, changePassword);

userRouter.post('/:userId/favorite', auth, addFavorite);
userRouter.delete('/:userId/favorite/:productId', auth, deleteFavorite);

userRouter.delete('/:id', auth, isAdmin, removeUser);

// user cart
userRouter.get('/:userId/cart', auth, getCartInfo);
userRouter.post('/:userId/cart', auth, addItemToCart);
userRouter.put('/:userId/cart', auth, changeQuantityInCart);
userRouter.delete('/:userId/cart', auth, refreshCart);
userRouter.delete('/:userId/cart/:productId', auth, deleteItem);

// user order
userRouter.get('/:userId/orders/:index', auth, getOrders);
userRouter.post('/:userId/orders', auth, addOrder);

export default userRouter;
