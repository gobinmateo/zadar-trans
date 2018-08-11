import crypto from 'crypto';
import express from 'express';
import verifyUser from '../authentication/verify.user.middleware';

import User from '../models/user.model';

const router = express.Router();

router.post('/login', verifyUser, async (req, res, next) => {
  try {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
    req.body.refreshKey = salt;

    const token = jwt.sign(req.body, process.env.JWT_SECRET);

    res.status(201).send({ accessToken: token });
  } catch (err) {
    res.sendStatus(500);
  }

  // session was previously saved in cookie
  if(token !== undefined && token !== "") {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

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
    console.log(user.comparePassword(password));
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
