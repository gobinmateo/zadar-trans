import crypto from'crypto';
import mongoose from 'mongoose';
import Role from '../utils/role';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum : [Role.OPERATOR.name, Role.ADMIN.name, Role.MODEL.name],
    default: Role.OPERATOR.name
  },
});

const User = mongoose.model('User', userSchema);

export default User;
