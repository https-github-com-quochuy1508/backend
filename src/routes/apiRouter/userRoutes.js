import { Router } from 'express';

import userController from '../../controller/userController';
import userValidate from '../../validate/userValidate';

const router = Router();

router.get('/', userValidate.authenFilter, userController.get_list);
router.get('/:id', userController.get_one);
router.get('/checkFriend/:friendId', userController.check_friend);
router.post('/changepass/:id', userValidate.changePassword, userController.changePass);
router.put('/:id', userValidate.authenUpdate, userController.update);
export default router;
