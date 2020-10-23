import { Router } from 'express';

import commentController from '../../controller/commentController';
import commentValidate from '../../validate/commentValidate';

const router = Router();

// router.get('/', postValidate.authenFilter, postController.get_list);
router.get("/", commentValidate.commentFilter, commentController.get_list);
router.post('/', commentValidate.commentCreate, commentController.create);
// router.put('/:id', postValidate.authenUpdate, postController.update);
// router.get('/:id', postController.get_one);
// router.get("/get/all", userCourseController.get_all);
export default router;
