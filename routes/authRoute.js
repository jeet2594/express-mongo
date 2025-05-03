import express from 'express';
import authController from '../controllers/authController.js';
import { loginValidation, registerValidation } from '../validations/userValidation.js';
import { validateRequest } from '../validations/validateRequest.js';
const router = express.Router();

router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/register', registerValidation, validateRequest, authController.register);

export default router;