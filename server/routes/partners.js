import express from 'express';
import { body, param } from 'express-validator/check';
import * as PartnersController from '../controllers/partners.controller';
import Partner from '../models/partner.model';
import verifyRequest from '../utils/verifyRequest.middleware';

const router = express.Router();

router.delete('/', [
  PartnersController.deleteAll
]);

router.delete('/:name', [
  param('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  PartnersController.deleteByName
]);

router.get('/', [
  PartnersController.getAllPartners
]);

router.get('/:name', [
  param('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  PartnersController.getByName
]);

router.put('/:name', [
  param('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  body('address', 'Address has to be provided').not().isEmpty(),
  body('address', 'Address has to be under 30 characters long').isLength({ max: 30 }),
  body('contactNumber', 'Contact number has to be provided').not().isEmpty(),
  body('contactNumber', 'Invalid number format').isNumeric(),
  body('name', 'Chaning partner name not allowed').isEmpty(),
  body('vehicleType', 'Vehicle type has to be provided').not().isEmpty(),
  body('vehicleType', 'Vehicle type has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  PartnersController.updateByName
]);

router.post('/', [
  body('address', 'Address has to be provided').not().isEmpty(),
  body('address', 'Address has to be under 30 characters long').isLength({ max: 30 }),
  body('contactNumber', 'Contact number has to be provided').not().isEmpty(),
  body('contactNumber', 'Invalid number format').isNumeric(),
  body('name', 'Name has to be provided').not().isEmpty(),
  body('name', 'Name has to be under 30 characters long').isLength({ max: 30 }),
  body('name').custom(Partner.checkNameInUse),
  body('vehicleType', 'Vehicle type has to be provided').not().isEmpty(),
  body('vehicleType', 'Vehicle type has to be under 30 characters long').isLength({ max: 30 }),
  verifyRequest,
  PartnersController.createPartner
]);

export default router;
