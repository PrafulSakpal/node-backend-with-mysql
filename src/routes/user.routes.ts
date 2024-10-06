import express from 'express';
import userController from '../controller/user.controller';

const router = express.Router();

// Create a new user
router.route('/').post(userController.createUser);
router.route('/:id').get(userController.getUser);
router.route('/:id').put(userController.updateUser);


export default router;
