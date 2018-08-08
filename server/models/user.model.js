import mongoose from 'mongoose';
import Role from '../utils/role';

const user = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum : [Role.OPERATOR.name, Role.ADMIN.name, Role.MODEL.name],
    default: Role.OPERATOR.name
  },
});

const User = mongoose.model('User', user);

export default User;
