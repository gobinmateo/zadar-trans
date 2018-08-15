import moment from 'moment';
import mongoose from 'mongoose';

import Company from '../models/company.model';
import Partner from '../models/partner.model';

const InterventionSchema = new mongoose.Schema({
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
  _id: {
    type: String,
    unique: true,
    required: true,
  },
  insurancePolicyNumber: String,
  interventionCompletionDate: Date,
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

InterventionSchema.pre('validate', function (next) {
  const doc = this;

  this.model('Intervention')
      .findOne()
      .sort({ _id: -1})
      .exec((err, result) => {
        //const year = moment().year();
        const year = 2019

        if(!result) {
          doc._id = 'I.' + year + '.' + 1;
        } else {
          const idElems = result._id.split('.');
          const interventionYear = parseInt(idElems[1]);
          const count = parseInt(idElems[2]);

          if(interventionYear !== year) {
            doc._id = 'I.' + year + '.' + 1;
          } else {
            doc._id = 'I.' + year + '.' + (count + 1);
          }
        }

        next();
      });
});

InterventionSchema.methods.fillFromFormData = async function fillFromFormData(data) {
  const {
    accidentArrivalDate,
    accidentLocation,
    additionalVehicleInfo,
    chassisNumber,
    checkoutRemark,
    company,
    dischargeLocation,
    firstRegistrationDate,
    insurancePolicyNumber,
    interventionCompletionDate,
    interventionRecievalDate,
    interventionStatus,
    partner,
    paymentMethod,
    peopleCount,
    phoneNumber,
    registrationPlate,
    remark,
    vehicleModel,
    victimName
  } = data;

  if(accidentArrivalDate) this.accidentArrivalDate = accidentArrivalDate;
  if(additionalVehicleInfo) this.additionalVehicleInfo = additionalVehicleInfo;
  if(chassisNumber) this.chassisNumber = chassisNumber;
  if(checkoutRemark) this.checkoutRemark = checkoutRemark;
  if(dischargeLocation) this.dischargeLocation = dischargeLocation;
  if(firstRegistrationDate) this.firstRegistrationDate = firstRegistrationDate;
  if(insurancePolicyNumber) this.insurancePolicyNumber = insurancePolicyNumber;
  if(interventionCompletionDate) this.interventionCompletionDate = interventionCompletionDate;
  if(interventionRecievalDate) this.interventionRecievalDate = interventionRecievalDate;
  if(interventionStatus) this.interventionStatus = interventionStatus;
  if(paymentMethod) this.paymentMethod = paymentMethod;
  if(peopleCount) this.peopleCount = peopleCount;
  if(phoneNumber) this.phoneNumber = phoneNumber;
  if(registrationPlate) this.registrationPlate = registrationPlate;
  if(remark) this.remark = remark;
  if(vehicleModel) this.vehicleModel = vehicleModel;
  if(victimName) this.victimName = victimName;
  if(accidentLocation) this.accidentLocation = accidentLocation;

  if(partner) {
    const p = await Partner.findOneByName(partner);

    if(p) this.partner = p;
  }

  if(company) {
    const c = await Company.findOneByName(company);

    if(c) this.company = c;
  }
};

InterventionSchema.statics.deleteOneById = (id) => {
  return Intervention.deleteOne({ _id: id });
};

InterventionSchema.statics.findOneById = (id) => {
  return Intervention.findOne({ id_: id });
};

const Intervention = mongoose.model('Intervention', InterventionSchema);

export default Intervention;
