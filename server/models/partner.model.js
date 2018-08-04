import mongoose from 'mongoose';

const partner = new mongoose.Schema({
  imePartnera: String,
  sifra: Number
});

const Partner = mongoose.model('Partner', partner);

export default Partner;
