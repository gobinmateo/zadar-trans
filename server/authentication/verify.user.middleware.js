import crypto from 'crypto';

import User from '../models/user.model';

const verifyUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if(!user) {
    res.sendStatus(404);
  } else {
    console.log(user.comparePassword(req.body.password))
    const passwordFields = user.password.split('$');

    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");

    if (hash === passwordFields[1]) {
      req.body = {
        email: user.email,
        role: user.role,
        password: user.password,
      };

      return next();
    } else {
      return res.sendStatus(400);
    }
  }
};

export default verifyUser;

