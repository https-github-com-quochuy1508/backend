import { Router } from 'express';

import notificationController from '../../controller/notificationController';
import notificationValidate from '../../validate/notificationValidate';

const router = Router();

router.get('/', notificationValidate.authenFilter, notificationController.get_list);
router.post('/', notificationValidate.authenCreate, notificationController.create);
router.put('/:id', notificationValidate.authenUpdate, notificationController.update);
router.delete("/:id", notificationController.delete);

export default router;
