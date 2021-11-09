import express from 'express';
import { join, login, logout } from '../controllers/user';
import { auth } from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/join', join);
userRouter.post('/login', login);
userRouter.post('/logout', auth, logout);

export default userRouter;
