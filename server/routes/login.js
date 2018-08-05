import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user.model';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { email, password } = req.body.data;
  const token = req.cookies.token;

  // session was previously saved in cookie
  if(token !== undefined && token !== "") {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    console.log(payload);

    res.sendStatus(200);

    return;
  }

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
      const payload = {
        role: user.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, function(err, token) {
        if(err) console.log(err);
        res.json({ token });
      });
    } else {
      res.status(403).send({ error: 'Invalid password provided!' });
    }
  }
});

export default router;
