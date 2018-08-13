import User from '../models/user.model';

const createUser = async (req, res, next) => {
  const newUser = new User();

  newUser.fillFromFormData(req.body);

  await newUser.save();

  res.status(200).json({ error: false, message: 'User created successfuly' });
};

const deleteAll = async (req, res, next) => {
  await User.deleteMany();

  res.sendStatus(204);
};

const deleteByEmail = async (req, res, next) => {
  const resp = await User.deleteOneByEmail(req.params.email);

  if(resp.n === 0) {
    res.status(404).json({ error: true, message: 'User not found' });
  } else {
    res.sendStatus(204);
  }
};

const getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json(users);
};

const getByEmail = async (req, res, next) => {
  const user = await User.findOneByEmail(req.params.email);

  if(!user) {
    res.status(404).json({ error: true, message: 'User not found' });
  } else {
    res.status(200).json(user);
  }
};

export { createUser, deleteAll, deleteByEmail, getAllUsers, getByEmail };
