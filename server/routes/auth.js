import crypto from 'crypto';
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyUser from '../authentication/verify.user.middleware';

import User from '../models/user.model';

const router = express.Router();

router.post('/login', verifyUser, async (req, res, next) => {
  const { email, password, role } = req.body.data;
  const payload = { role }

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ token });
});

router.get('/logout', (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({ logout: true })
    }
  });
});

export default router;
