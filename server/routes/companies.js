import express from 'express';

import Company from '../models/company.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Company.deleteMany();

  res.sendStatus(200);
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Company id has to be provided!' });

  await Company.deleteOne({ id });

  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const companies = await Company.find();

  res.json(companies);
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  if(id === undefined) res.send({ error: 'Id has to be provided!' });

  const company = await Company.findOne({ id });

  if(!company) {
    res.status(403).send({ error: 'Company with provided id does not exist!' });
  } else {
    res.json(company);
  }
});

router.put('/', async (req, res, next) => {
  const { contractExpiryDate, id, name, users } = req.body;

  // both parameters have to be present
  if(password === undefined) {
    res.status(400).send({ error: 'Password has to be provided!' });
  }

  const company = await Company.findOne({ id });

  // company doesn't exist
  if(!company) {
    res.status(403).send({ error: 'Company with provided id does not exist!' });
  } else {
    company.contractExpiryDate = contractExpiryDate;
    company.name = name;
    company.users = users;

    await company.save();

    res.status(200).send({ message: 'Company successfully updated.' });
  }
});

router.post('/', async (req, res, next) => {
  const { contractExpiryDate, id, name, users } = req.body;

  // both parameters have to be present
  if(id === undefined) {
    res.status(400).send({ error: 'Company id has to be provided!' });
  }

  const company = await Company.findOne({ id });

  // company already exists
  if(company) {
    res.status(403).send({ error: 'Company with provided id already exists!' });
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);

    const newCompany = new Company();

    newCompany.contractExpiryDate = contractExpiryDate;
    newCompany.id = id;
    newCompany.name = name;
    newCompany.users = users;

    await newCompany.save();

    res.status(200).send({ message: 'Company successfully added to database.' });
  }
});

export default router;
