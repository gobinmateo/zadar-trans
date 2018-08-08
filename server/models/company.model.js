import mongoose from 'mongoose';

const company = new mongoose.Schema({
  contractExpiryDate: Date,
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  users: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'User'
  }],
});

const Company = mongoose.model('Company', company);

export default Company;
