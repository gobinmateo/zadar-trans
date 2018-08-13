import express from 'express';
import { body, param } from 'express-validator/check';
import * as CompanyController from '../controllers/companies.controller';
import Company from '../models/company.model';
import verifyRequest from '../utils/verifyRequest.middleware';

const router = express.Router();

router.delete('/', [
  CompanyController.deleteAll
]);

router.delete('/:name', [
  param('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  param('name', 'Invalid name format').isAlpha(),
  verifyRequest,
  CompanyController.deleteByName
]);

router.get('/', [
  CompanyController.getAll
]);

router.get('/:name', [
  param('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  param('name', 'Invalid name format').isAlpha(),
  verifyRequest,
  CompanyController.getByName
]);

router.post('/', [
  body('id', 'Id has to be provided').not().isEmpty(),
  body('id', 'Id has to be under 30 characters long').isLength({ max: 30 }),
  body('id').custom(Company.checkIdInUse),
  body('name', 'Name has to be provided').not().isEmpty(),
  body('name', 'Invalid name format').isAlpha(),
  body('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  body('name', 'Name already in use').custom(Company.checkNameInUse),
  verifyRequest,
  CompanyController.createNew
]);

export default router;
