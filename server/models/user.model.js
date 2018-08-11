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
userSchema.methods.comparePassword = (password) => {
  const passwordFields = password.split('$');

  const salt = passwordFields[0];
  const hash = crypto.createHmac('sha512', salt).update(password).digest("base64");

  return hash === passwordFields[1];
}

const User = mongoose.model('User', userSchema);

export default User;
