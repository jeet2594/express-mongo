import express from 'express';
import userController from '../controllers/userController.js';
import { authorizeUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authorizeUser, userController.getUsers);

export default router;