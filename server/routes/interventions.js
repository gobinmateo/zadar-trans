import express from 'express';
import updateAttributesFromParams from '../utils/paramsParser';

import Intervention from '../models/intervention.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Intervention.deleteMany();

  res.sendStatus(204);
});

router.delete('/:id', async (req, res, next) => {
  await Intervention.deleteOne({ id });

  res.sendStatus(204);
});

router.get('/', async (req, res, next) => {
  const interventions = await Intervention.find();
  res.json(interventions);
});

router.get('/:id', async (req, res, next) => {
  const intervention = await Intervention.findOne({ id: req.params.id });

  if(!intervention) {
    res.sendStatus(404);
  } else {
    res.json(intervention);
  }
});

router.put('/:id', async (req, res, next) => {
  const intervention = await Intervention.findOne({ id: req.params.id });

  if(!intervention) {
    res.sendStatus(404);
  } else {
    updateAttributesFromParams(req.body, company);

    await intervention.save();

    res.sendStatus(200);
  }
});

router.post('/', async (req, res, next) => {
  const intervention = await Intervention.findOne({ id: req.body.id });

  if(intervention) {
    res.sendStatus(404);
  } else {
    const newIntervention = new Intervention();

    updateAttributesFromParams(req.body, newIntervention);

    console.log('NEW INTERVENTION ', newIntervention);
    await newIntervention.save();
    res.status(200).send({ message: 'Intervention successfully added to database.' });
  }
});

export default router;
