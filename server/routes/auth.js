import express from 'express';
import { body, param } from 'express-validator/check';
import verifyRequest from '../utils/verifyRequest.middleware';
import verifyUser from '../authentication/verify.user.middleware';
import * as AuthController from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', [
  body('email', 'Email has to be provided').not().isEmpty(),
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password has to be provided').not().isEmpty(),
  body('password', 'Password has to be between 5 and 20 characters long').isLength({ min: 5, max: 20 }),
  verifyRequest,
  verifyUser,
  AuthController.login
]);

router.get('/logout', [
  AuthController.logout
]);

export default router;
