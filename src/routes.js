import { Router } from 'express';

import userRoutes from './routes/apiRouter/userRoutes';
import postRoutes from './routes/apiRouter/postRoutes';
import commentRoutes from './routes/apiRouter/commentRoutes';
import uploadRoutes from './routes/apiRouter/uploadRoutes';
import friendRoutes from './routes/apiRouter/friendRoutes';

const router = Router();

router.get('/', (req, res) => {
	res.json({
		app: req.app.locals.title,
		apiVersion: req.app.locals.version,
	});
});

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/upload', uploadRoutes);
router.use('/friends', friendRoutes);

export default router;
