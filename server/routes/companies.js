import express from 'express';
import updateAttributesFromParams from '../utils/paramsParser';

import Company from '../models/company.model';
import User from '../models/user.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await Company.deleteMany();

  res.sendStatus(204);
});

router.delete('/:id', async (req, res, next) => {
  const resp = await Company.deleteOne({ id: req.params.id });

  resp.n === 0 ? res.sendStatus(404) : res.sendStatus(204);
});

router.get('/', async (req, res, next) => {
  const companies = await Company.find()
                                  .populate('users');

  res.json(companies);
});

router.get('/:id', async (req, res, next) => {
  const company = await Company.findOne({ id: req.params.id })
                                .populate('users');

  if(!company) {
    res.sendStatus(404);
  } else {
    res.json(company);
  }
});

router.put('/:id', async (req, res, next) => {
  const company = await Company.findOne({ id: req.params.id });

  if(!company) {
    res.sendStatus(404);
  } else {
    updateAttributesFromParams(req.body, company);

    if(req.body.users) {
      for(const email of req.body.users) {
        const user = await User.findOne({ email });

        if(user) newCompany.users.push(user._id);
      }
    }

    await company.save((err => {
      if(err.name = 'ValidationError') res.status(400);
      else res.sendStatus(201);
    }));
  }
});

router.post('/', async (req, res, next) => {
  const company = await Company.findOne({ id: req.body.id });

  if(company) {
    res.sendStatus(400);
  } else {
    const newCompany = new Company();

    updateAttributesFromParams(req.body, newCompany);

    if(req.body.users) {
      for(const email of req.body.users) {
        const user = await User.findOne({ email });

        if(user) newCompany.users.push(user._id);
      }
    }

    await newCompany.save((err => {
      if(err) res.status(400).send(err.errors.id.message);
      else res.sendStatus(201);
    }));
  }
});

export default router;
