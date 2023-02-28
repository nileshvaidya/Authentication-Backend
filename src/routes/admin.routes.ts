import { changePassword } from './../controllers/admin.controller';
import { Router } from 'express';
import { deleteUser, getUser, getUsers, updateRole } from '../controllers/admin.controller';
import { userAuthorization } from '../middleware/authorization.middleware';
// import { verifyToken } from '../controllers/authController';

const router = Router();

router.get('/users', userAuthorization, getUsers);
router.get('/user/:id', userAuthorization, getUser)
router.delete('/user/:id', userAuthorization, deleteUser)
router.post('/update-role/:id/:role', userAuthorization, updateRole)
router.post('/update-password', userAuthorization, changePassword)
export default router; 