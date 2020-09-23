import { Router } from 'express';

import userRoutes from './routes/apiRouter/userRoutes';
import postRoutes from './routes/apiRouter/postRoutes';

const router = Router();

router.get('/', (req, res) => {
	res.json({
		app: req.app.locals.title,
		apiVersion: req.app.locals.version,
	});
});

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

export default router;
