import express from 'express';

import Partner from '../models/partner.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Partner.deleteMany();

  res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Email has to be provided!' });

  await Partner.deleteOne({id: id});

  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const users = await Partner.find();

  res.json(users);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Email has to be provided!' });

  const partner = await Partner.findOne({id: id});

  if(!partner) {
    res.status(403).send({ error: 'Partner with provided id does not exist!' });
  } else {
    res.json(partner);
  }
});

router.put('/', async (req, res, next) => {
  const { id, name } = req.body;

  // both parameters have to be present
  if(id === undefined || name === undefined) {
    res.status(400).send({ error: 'Id and name have to be provided!' });
  }

  const partner = await Partner.findOne({ id });

  // partner doesn't exist
  if(!partner) {
    res.status(403).send({ error: 'Partner with provided id does not exist!' });
  } else {
    partner.name = name;

    await partner.save();

    res.status(200).send({ message: 'Partner successfully updated.' });
  }
});

router.post('/', async (req, res, next) => {
  const { id, name } = req.body;

  // both parameters have to be present
  if(id === undefined || name === undefined) {
    res.status(400).send({ error: 'Id and name have to be provided!' });
  }

  const partner = await Partner.findOne({ id });

  // partner already exists
  if(partner) {
    res.status(403).send({ error: 'Partner with provided id already exists!' });
  } else {
    const newPartner = new Partner();

    newPartner.id = id;
    newPartner.name = name;

    await newPartner.save();

    res.status(200).send({ message: 'Partner successfully added to database.' });
  }
});

export default router;
