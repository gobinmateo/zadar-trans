import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(401);
      }

      req.session.role = decoded.role;

      return next();
    });
  } else {
    return next();
  }
};

export default verifyToken;
