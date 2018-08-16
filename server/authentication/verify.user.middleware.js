import crypto from 'crypto';

import User from '../models/user.model';

const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOneByEmail(email);

  if(!user) {
    res.status(404).json({ error: true, message: 'Invalid email' });
  } else {
    const passwordFields = user.password.split('$');

    const salt = passwordFields[0];
    const hash = crypto.createHmac(process.env.HASH_ALGORITHM, salt).update(password).digest("base64");

    if (hash === passwordFields[1]) {
      req.body.role = user.role;

      return next();
    } else {
      return res.status(403).json({ error: true, message: 'Invalid password'});
    }
  }
};

export default verifyUser;
