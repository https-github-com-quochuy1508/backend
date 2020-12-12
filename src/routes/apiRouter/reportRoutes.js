import { Router } from 'express';

import reportController from '../../controller/reportController';
import reportValidate from '../../validate/reportValidate';

const router = Router();

// router.get('/', reportValidate.reportFilter, reportController.get_list);
router.post('/', reportValidate.reportCreate, reportController.create);
// router.put('/:id', reportValidate.reportUpdate, reportController.update);
// router.delete("/:id", reportController.delete);

export default router;
