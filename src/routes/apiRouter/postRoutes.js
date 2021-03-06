import { Router } from 'express';

import postController from '../../controller/postController';
import postValidate from '../../validate/postValidate';

const router = Router();

router.get('/', postValidate.authenFilter, postController.get_list);
router.get('/search/ok', postValidate.authenFilter, postController.search);
// router.get("/:id", postController.get_one);
router.post('/', postValidate.authenCreate, postController.create);
router.put('/:id', postValidate.authenUpdate, postController.update);
router.get('/:id', postController.get_one);
router.get('/count/like', postController.count);
router.delete('/:id', postController.delete);

export default router;
