import { Router } from 'express';
import { index } from '../controllers/indexController';


const router = Router();

router.get('/', index);

export default router;