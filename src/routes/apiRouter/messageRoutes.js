import { Router } from 'express';

import messageController from '../../controller/messageController';
import messageValidate from '../../validate/messageValidate';

const router = Router();

// router.get('/', messageValidate.messageFilter, messageController.get_list);
router.post('/', messageValidate.messageCreate, messageController.create);
// router.put('/:id', messageValidate.messageUpdate, messageController.update);
// router.delete("/:id", messageController.delete);

export default router;
