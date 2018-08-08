import mongoose from 'mongoose';

const partner = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name:  {
    type: String,
    unique: true,
    required: true,
  }
});

const Partner = mongoose.model('Partner', partner);

export default Partner;
