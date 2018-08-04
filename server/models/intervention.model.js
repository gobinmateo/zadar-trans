import mongoose from 'mongoose';

const intervention = new mongoose.Schema({
  brMobStranke: String,
  brOsobaUVozilu: Number,
  brPoliceOsiguranja: String,
  brSasije: String,
  brSlucaja: Number,
  datumPrveRegistracije: Date,
  imeIPrezimeStranke: String,
  lokacijaIstovara: String,
  lokacijaNesrece: String,
  markaIModelVozila: String,
  company: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Company'
  },
  nacinPlacanja: String,
  napomenaOOdjavi: String,
  odjava: String,
  opisStatusaVozila: String,
  partnerID: Number,
  registracija: String,
  statusIntervencije: String,
  statusVozila: String,
  vrijemeDolaskaNaLokacijuNesrece: Date,
  vrijemeZaprimanjaIntervencije: Date,
  vrijemeZavrsetkaUsluge: Date
});

const Intervention = mongoose.model('Intervention', intervention);

export default Intervention;
