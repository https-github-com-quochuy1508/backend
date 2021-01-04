import { Router } from 'express';

import userRoutes from './routes/apiRouter/userRoutes';
import postRoutes from './routes/apiRouter/postRoutes';
import commentRoutes from './routes/apiRouter/commentRoutes';
import likeRoutes from './routes/apiRouter/likeRoutes';
import uploadRoutes from './routes/apiRouter/uploadRoutes';
import friendRoutes from './routes/apiRouter/friendRoutes';
import blacklistRoutes from './routes/apiRouter/blacklistRoutes';
import reportRoutes from './routes/apiRouter/reportRoutes';
import messageRoutes from './routes/apiRouter/messageRoutes';
import notificationRoutes from './routes/apiRouter/notificationRoutes';

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
router.use('/likes', likeRoutes);
router.use('/blacklist', blacklistRoutes);
router.use('/reports', reportRoutes);
router.use('/messages', messageRoutes);
router.use('/notifications', notificationRoutes);

export default router;
