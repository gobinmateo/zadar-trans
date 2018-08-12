import crypto from 'crypto';

import User from '../models/user.model';

const verifyUser = async (req, res, next) => {
  const { email, password } = req.body.data;
  const user = await User.findOne({ email });

  if(!user) {
    res.sendStatus(404);
  } else {
    const passwordFields = user.password.split('$');

    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");

    if (hash === passwordFields[1]) {
      console.log('DOBAR PASSWORD')
      req.body.data.role = user.role;

      return next();
    } else {
      console.log('wrong pass')
      return res.sendStatus(400);
    }
  }
};

export default verifyUser;

