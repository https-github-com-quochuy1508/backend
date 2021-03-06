import { Router } from 'express';

import likeController from '../../controller/likeController';
import likeValidate from '../../validate/likeValidate';

const router = Router();

router.post('/', likeValidate.authenCreate, likeController.create);
router.delete('/userId=:userId&postId=:postId', likeController.delete);

export default router;
