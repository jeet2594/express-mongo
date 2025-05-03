import express from 'express';
const router = express.Router();
import userRoutes from './userRoutes.js';
import authRouter from './authRoute.js';

router.use('/users', userRoutes);
router.use('/auth', authRouter);
export default router;