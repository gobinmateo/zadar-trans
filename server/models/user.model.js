import mongoose from 'mongoose';
import Role from '../utils/role';

const user = new mongoose.Schema({
  email: String,
  passwordHash: String,
  role: {
    type: String,
    enum : [Role.OPERATOR.name, Role.ADMIN.name, Role.MODEL.name],
    default: Role.OPERATOR.name
  },
});

const User = mongoose.model('User', user);

export default User;
