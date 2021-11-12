import express from 'express';
import { getAll, join, login, logout, removeUser } from '../controllers/user';
import { auth } from '../middleware/auth';
import isAdmin from '../middleware/isAdmin';

const userRouter = express.Router();

userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.get('/logout', auth, logout);

userRouter.get('/', auth, isAdmin, getAll);

userRouter.delete('/:id', auth, isAdmin, removeUser);

export default userRouter;
