import crypto from 'crypto';

import User from '../models/user.model';

const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOneByEmail(email);

  if(!user) {
    res.status(400).json({ error: true, message: 'Invalid email' });
  } else {
    const passwordFields = user.password.split('$');

    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    console.log(hash)
    if (hash === passwordFields[1]) {
      req.body.role = user.role;

      return next();
    } else {
      return res.status(401).json({ error: true, message: 'Invalid password'});
    }
  }
};

export default verifyUser;

