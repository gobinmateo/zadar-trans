import express from 'express';
import { body, param } from 'express-validator/check';
import * as UsersController from '../controllers/users.controller';
import User from '../models/user.model';
import Role from '../utils/role.enum';
import verifyRequest from '../utils/verifyRequest.middleware';

const router = express.Router();

router.delete('/', [
  UsersController.deleteAll
]);

router.delete('/:email', [
  param('email', 'Invalid email format').isEmail(),
  verifyRequest,
  UsersController.deleteByEmail
]);

router.get('/', [
  UsersController.getAllUsers
])

router.get('/:email', [
  param('email', 'Invalid email format').isEmail(),
  verifyRequest,
  UsersController.getByEmail
]);

router.post('/', [
  body('email', 'Email has to be provided').not().isEmpty(),
  body('email', 'Invalid email format').isEmail(),
  body('email').custom(User.checkEmailInUse),
  body('password', 'Password has to be provided').not().isEmpty(),
  body('password', 'Password has to be between 5 and 20 characters long').isLength({ min: 5, max: 20 }),
  body('role', 'Invalid role value').custom(Role.validateRole),
  verifyRequest,
  UsersController.createUser
]);

export default router;
