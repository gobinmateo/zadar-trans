import express from 'express';
import updateAttributesFromParams from '../utils/paramsParser';


import Partner from '../models/partner.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Partner.deleteMany();

  res.sendStatus(204);
});

router.delete('/:id', async (req, res, next) => {
  await Partner.deleteOne({ id: req.params.id});

  res.sendStatus(204);
});

router.get('/', async (req, res, next) => {
  const partners = await Partner.find();

  res.json(partners);
});

router.get('/:id', async (req, res, next) => {
  const partner = await Partner.findOne({ id: req.params.id });

  if(!partner) {
    res.sendStatus(404);
  } else {
    res.json(partner);
  }
});

router.put('/:id', async (req, res, next) => {
  const partner = await Partner.findOne({ id: req.params.id });

  if(!partner) {
    res.sendStatus(404);
  } else {
    updateAttributesFromParams(req.body, partner);

    await partner.save();

    res.sendStatus(200);
  }
});

router.post('/', async (req, res, next) => {
  const partner = await Partner.findOne({ id: req.body.id });

  if(partner) {
    res.sendStatus(404);
  } else {
    const newPartner = new Partner();

    updateAttributesFromParams(req.body, newPartner);

    await newPartner.save();

    res.sendStatus(200);
  }
});

export default router;
