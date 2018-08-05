import mongoose from 'mongoose';

const company = new mongoose.Schema({
  contractExpiryDate: Date,
  id: Number,
  name: String,
  users: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'User'
  }],
});

const Company = mongoose.model('Company', company);

export default Company;
