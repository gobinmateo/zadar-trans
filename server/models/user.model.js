import crypto from'crypto';
import mongoose from 'mongoose';
import Role from '../utils/role.enum';

const UserSchema = new mongoose.Schema({
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
    enum : [ Role.MODEL.name, Role.OPERATOR.name ],
    default: Role.OPERATOR.name
  },
});

UserSchema.methods.fillFromFormData = function fillFromFormData(data) {
  const { email, password, role } = data;
  const salt = crypto.randomBytes(16).toString('base64');

  this.email = email;
  this.password = this.model('User').getHashedPassword(password, salt);
  this.role = role;
};

UserSchema.statics.checkEmailInUse = (email) => {
  return User.find({ email }).limit(1).then(users => {
    if (users[0]) {
      return Promise.reject('Email already in use');
    }
  });
};

UserSchema.statics.deleteOneByEmail = (email) => {
  return User.deleteOne({ email });
};

UserSchema.statics.findOneByEmail = async(email) => {
  return User.findOne({ email });
};

UserSchema.statics.getHashedPassword = (password, salt) => {
  const hash = crypto.createHmac(process.env.HASH_ALGORITHM,salt)
                       .update(password)
                       .digest("base64");

  return salt + '$' + hash;
};

const User = mongoose.model('User', UserSchema);

export default User;
