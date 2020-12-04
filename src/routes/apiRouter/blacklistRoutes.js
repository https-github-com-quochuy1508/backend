import { Router } from 'express';

import blacklistController from '../../controller/blacklistController';
import blacklistValidate from '../../validate/blacklistValidate';

const router = Router();

router.get('/', blacklistValidate.authenFilter, blacklistController.get_list);
router.get('/:id', blacklistController.get_one);
router.post('/', blacklistValidate.authenCreate, blacklistController.create);
router.put('/:id', blacklistValidate.authenUpdate, blacklistController.update);
router.get('/:id', blacklistController.get_one);
router.delete('/:id', blacklistController.delete);

export default router;
