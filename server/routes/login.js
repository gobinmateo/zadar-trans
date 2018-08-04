import crypto from 'crypto';
import express from 'express';
import User from '../models/user.model';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body.data;

  // both parameters have to be present
  if(email === undefined || password === undefined) {
    res.status(400).send({ error: 'Both email and password have to be provided!' });
  }

  const user = await User.findOne({ email });

  // user doesn't exist
  if(!user) {
    res.status(403).send({ error: 'User with provided email does not exist!' });
  } else {
    const hash = crypto.createHash('sha256');

    hash.update(password);
    const hashedpw = hash.digest('hex');

    if(hashedpw === user.passwordHash) {
      res.sendStatus(200);
    } else {
      res.status(403).send({ error: 'Invalid password provided!' });
    }
  }
});

export default router;
