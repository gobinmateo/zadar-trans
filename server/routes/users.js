import crypto from 'crypto';
import express from 'express';
import updateAttributesFromParams from '../utils/paramsParser';


import Role from '../utils/role';
import User from '../models/user.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await User.deleteMany();

  res.sendStatus(204);
});

router.delete('/:email', async (req, res, next) => {
  await User.deleteOne({ email: req.body.email });

  res.sendStatus(204);
});

router.get('/', async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

router.get('/:email', async (req, res, next) => {
  const user = await User.findOne({email: req.body.email});

  if(!user) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
});

router.put('/:email', async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user) {
    res.sendStatus(404);
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);

    updateAttributesFromParams(req.body, user);

    user.passwordHash = hash.digest('hex');

    await user.save();

    res.sendStatus(200);
  }
});

router.post('/', async (req, res, next) => {
  const user = await User.findOne({ email : req.body.email });

  if(user) {
    res.sendStatus(404);
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);

    const newUser = new User();

    updateAttributesFromParams(req.body, newUser);

    newUser.passwordHash = hash.digest('hex');

    await newUser.save();

    res.status(200).send({ message: 'User successfully added to database.' });
  }
});

export default router;
