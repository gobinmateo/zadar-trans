import mongoose from 'mongoose';

const company = new mongoose.Schema({
  imeModela: String,
  sifra: Number,
  korisnici: [{
    type: mongoose.SchemaTypes.ObjectId, ref: 'User'
  }],
  zavrsetakTrajanjaUgovora: Date,
});

const Company = mongoose.model('Company', company);

export default Company;
