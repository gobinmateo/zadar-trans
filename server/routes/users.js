import crypto from 'crypto';
import express from 'express';
import User from '../models/user.model';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const users = await User.find();

  res.json(users);
});

router.get('/:email', async (req, res, next) => {
  const email = req.params.email;

  if(email === undefined) res.send({ error: 'Email to be provided!' });

  const user = await User.findOne({email: email});

  if(!user) {
    const newUser = new User();

    newUser.email = email;
    newUser.resources = process.env.DEFAULT_RESOURCES_AMOUNT;
    newUser.level = process.env.DEFAULT_LEVEL;

    await newUser.save();

    res.json(newUser);
  } else {
    res.json(user);
  }
});

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  // both parameters have to be present
  if(email === undefined || password === undefined) {
    res.status(400).send({ error: 'Both email and password have to be provided!' });
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

    await newUser.save();

    res.status(200).send({ message: 'User successfully added to database.' });
  }
});

export default router;
