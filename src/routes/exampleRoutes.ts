import { authChecker } from './../middleware/authChecker';
import { getExampleDataValidation } from './../validation/exampleValidation/exampleValidation';
import { Router } from 'express';
import { getExample, getExampleData } from '../controllers/exampleControllers';

const router = Router();

router.get("/",authChecker, getExample);
router.post("/", getExampleDataValidation, getExampleData);


export default router;