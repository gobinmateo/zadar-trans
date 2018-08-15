import express from 'express';
import { body, param } from 'express-validator/check';
import * as InterventionController from '../controllers/interventions.controller';
import verifyRequest from '../utils/verifyRequest.middleware';

import Intervention from '../models/intervention.model';

const router = express.Router();

router.delete('/', [
  InterventionController.deleteAll
]);

router.delete('/:id', [
  param('id', 'id has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  InterventionController.deleteById
]);

router.get('/', [
  InterventionController.getAll
]);

router.get('/:id', [
  param('id', 'id has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  InterventionController.getById
]);

router.put('/:id', [
  param('id', 'id has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  InterventionController.updateById
]);

router.post('/', [
  InterventionController.createNew
]);

export default router;
