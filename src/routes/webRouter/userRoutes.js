import { Router } from 'express';

import userController from '../../controller/userController';
import userValidate from '../../validate/userValidate';

const router = Router();

router.get('/', userValidate.authenFilter, userController.get_list);
router.get('/:id', userController.get_one);
router.post('/', userValidate.authenCreate, userController.create);
// router.get('/get/all', userController.get_all);
export default router;
