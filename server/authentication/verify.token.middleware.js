import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('JWT VERIFY ERROR', err);
        return res.sendStatus(401);
      }

      req.session.role = decoded.role;

      console.log('DEKODIRAN TOKEN ', decoded.role)

      return next();
    });
  } else {
    console.log('ROLE OD PRIJE', req.session.role)
    return next();
  }
};

export default verifyToken;
