import { Router } from 'express';
import { getUser } from '../controllers/admin.controller';
import { userAuthorization } from '../middleware/authorization.middleware';
// import { getLogin, getLogout, getRegister, getUser, postLogin, postRegister, refreshToken, verifyToken } from '../controllers/authController';
import {signupUserValidation, signinUserValidation } from '../validation/authValidation/authValidation';



const router = Router();

router.get('/user', userAuthorization, getUser);
// //router.get('/register',signupUserValidation, getRegister); 
// router.post('/login', signinUserValidation, postLogin);
// router.post('/register',signupUserValidation, postRegister);
// router.get('/refresh', refreshToken,verifyToken,getUser);
// router.post('/logout',verifyToken, getLogout);
export default router; 