import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { login, logout, signup, userDetails } from '../controllers/user_controllers.js';

const userRouter = express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.get('/getUserData',Authenticate,userDetails);
userRouter.get('/logout',logout);

export default userRouter;