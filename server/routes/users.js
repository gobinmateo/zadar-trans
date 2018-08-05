import crypto from 'crypto';
import express from 'express';

import Role from '../utils/role';
import User from '../models/user.model';

const router = express.Router();

router.delete('/', async (req, res, next) => {
  await User.deleteMany();

  res.sendStatus(200);
});

router.delete('/:email', async (req, res, next) => {
  console.log(' U SINGLE DELETU');
  const email = req.params.email;

  if(email === undefined) res.send({ error: 'Email has to be provided!' });

  await User.deleteOne({email: email});

  res.sendStatus(200);
});

router.get('/', async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

router.get('/:email', async (req, res, next) => {
  const email = req.params.email;

  if(email === undefined) res.send({ error: 'Email has to be provided!' });

  const user = await User.findOne({email: email});

  if(!user) {
    res.status(403).send({ error: 'User with provided email does not exist!' });
  } else {
    res.json(user);
  }
});

router.put('/', async (req, res, next) => {
  const { email, password } = req.body;

  // both parameters have to be present
  if(password === undefined) {
    res.status(400).send({ error: 'Password has to be provided!' });
  }

  const user = await User.findOne({ email });

  // user doesn't exist
  if(!user) {
    res.status(403).send({ error: 'User with provided email does not exist!' });
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);
    const hashedpw = hash.digest('hex');

    user.passwordHash = hashedpw;

    await user.save();

    res.status(200).send({ message: 'User successfully updated.' });
  }
});

router.post('/', async (req, res, next) => {
  const { email, password, role } = req.body;
  const roleValue = Role.enumValueOf(role);

  // both parameters have to be present
  if(email === undefined || password === undefined || role === undefined) {
    res.status(400).send({ error: 'Email, password and role have to be provided!' });
  } else if(roleValue !== Role.ADMIN && roleValue !== Role.OPERATOR && roleValue !== Role.MODEL) {
    res.status(400).send({ error: 'Invalid role provided, possible values are: ADMIN, OPERATOR and MODEL!' });
  }

  const user = await User.findOne({ email });

  // user already exists
  if(user) {
    res.status(403).send({ error: 'User with provided email already exists!' });
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);
    const hashedpw = hash.digest('hex');

    const newUser = new User();

    newUser.email = email;
    newUser.passwordHash = hashedpw;
    newUser.role = role;

    await newUser.save();

    res.status(200).send({ message: 'User successfully added to database.' });
  }
});

export default router;
