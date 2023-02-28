import { newUserValidation, signinUserValidation } from '../validation/userValidation/userValidation';

import { Router } from 'express';
import { getUserProfile, logoutUser, signinUser, signupUser } from "../controllers/userControllers";
import { userAuthorization } from '../middleware/authorization.middleware';

const router = Router();

//Get user profile router
router.get('/profile', userAuthorization, getUserProfile)
//Create a new user route
router.post("/",newUserValidation, signupUser);
//User sign in Router
router.post("/login",signinUserValidation, signinUser);
// Reset Password Router
// router.patch("/reset-password",signinUserValidation);
// User logout and invalidate jwts
console.log("Route reached");

router.delete("/logout", userAuthorization, logoutUser);
export default router;