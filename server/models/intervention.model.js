import mongoose from 'mongoose';

const intervention = new mongoose.Schema({
  accidentArrivalDate: Date,
  accidentLocation: String,
  additionalVechileInfo: String,
  chassisNumber: String,
  checkoutRemark: String,
  company: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Company'
  },
  dischargeLocation: String,
  firstRegistrationDate: Date,
  id: Number,
  insurancePolicyNumber: String,
  interventionCompletionDate: Date
  interventionRecievalDate: Date,
  interventionStatus: String,
  partner: {
    type: mongoose.SchemaTypes.ObjectId, ref: 'Partner'
  },
  paymentMethod: String,
  peopleCount: Number,
  phoneNumber: String,
  registrationPlate: String,
  remark: String,
  vehicleModel: String,
  vehicleStatus: String,
  victimName: String,
});

const Intervention = mongoose.model('Intervention', intervention);

export default Intervention;
