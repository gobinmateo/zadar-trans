import mongoose from 'mongoose';

const user = new mongoose.Schema({
  email: String,
  passwordHash: String,

});

const User = mongoose.model('User', user);

export default User;
