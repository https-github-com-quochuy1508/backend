import { Router } from 'express';
import userRoutes from './routes/webRouter/userRoutes';
import uploadRoutes from './routes/webRouter/uploadRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/upload', uploadRoutes);

export default router;
