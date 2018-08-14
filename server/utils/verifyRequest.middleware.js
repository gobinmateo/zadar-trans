import { validationResult } from 'express-validator/check';

const verifyRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array())
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export default verifyRequest;
