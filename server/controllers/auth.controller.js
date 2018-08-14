import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
  const { email, password, role } = req.body;
  const payload = { role }

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  res.json({ token });
};

const logout = (req,res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: true, message: 'An error occured while destroying session'});
    } else {
      res.status(200).json({ error: false, message: 'User successfuly loged out' });
    }
  });
};

export { login, logout };
