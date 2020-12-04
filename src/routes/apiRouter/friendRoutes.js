import { Router } from 'express';

import friendController from '../../controller/friendController';
import friendValidate from '../../validate/friendValidate';

const router = Router();

router.get('/', friendValidate.friendFilter, friendController.get_list);
router.post('/', friendValidate.friendCreate, friendController.create);
router.put('/:id', friendValidate.friendUpdate, friendController.update);
router.delete("/:id", friendController.delete);

export default router;
