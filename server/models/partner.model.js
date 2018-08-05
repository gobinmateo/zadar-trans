import mongoose from 'mongoose';

const partner = new mongoose.Schema({
  id: Number
  name: String,
});

const Partner = mongoose.model('Partner', partner);

export default Partner;
