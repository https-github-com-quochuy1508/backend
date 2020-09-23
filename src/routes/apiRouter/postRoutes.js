import { Router } from 'express';

import postController from '../../controller/postController';
import postValidate from '../../validate/postValidate';

const router = Router();

router.get('/', postValidate.authenFilter, postController.get_list);
// router.get("/:id", postController.get_one);
router.post('/', postValidate.authenCreate, postController.create);
router.put('/:id', postValidate.authenUpdate, postController.update);
router.get('/:id', postController.get_one);
// router.get("/get/all", userCourseController.get_all);
export default router;
