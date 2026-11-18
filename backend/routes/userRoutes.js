import { Router } from 'express';
import { saveUser } from '../controllers/userController.js';
 
const router = Router();
 
// POST /users — recibe name y email, guarda el usuario
router.post('/', saveUser);
 
export default router;
