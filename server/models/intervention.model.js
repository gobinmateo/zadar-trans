import moment from 'moment';
import mongoose from 'mongoose';
import socket from '../utils/socket.client';

import Company from '../models/company.model';
import InterventionStatus from '../utils/interventionStatus.enum';
import Partner from '../models/partner.model';

import formatId from '../utils/interventionIdFormatter';

const InterventionSchema = new mongoose.Schema({
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
  interventionArrivalDateTime: Date,
  interventionCompletionDateTime: Date,
  interventionRecievalDateTime: Date,
  interventionStatus: {
    type: String,
    required: true,
    enum : [InterventionStatus.DODIJELJENA.name, InterventionStatus.OBAVLJENA.name, InterventionStatus.ZAPRIMLJENA.name],
    default: InterventionStatus.ZAPRIMLJENA.name
  },
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
        const year = moment().year();

        if(!result) {
          doc._id = 'I.' + year + '.' + formatId(1);
        } else {
          const idElems = result._id.split('.');
          const interventionYear = parseInt(idElems[1]);
          const count = parseInt(idElems[2]);

          if(interventionYear !== year) {
            doc._id = 'I.' + year + '.' + formatId(1);
          } else {
            doc._id = 'I.' + year + '.' + formatId(count + 1);
          }
        }

        next();
      });
});

InterventionSchema.pre('save', function (next) {
  if(this.partner) {
    this.interventionStatus = InterventionStatus.DODIJELJENA.name;
  }

  next();
});

InterventionSchema.post('save', function(intervention) {
  socket.emit('INTERVENTION_CREATED', intervention);
});

InterventionSchema.methods.fillFromFormData = async function fillFromFormData(data) {
  const {
    accidentLocation,
    additionalVehicleInfo,
    chassisNumber,
    checkoutRemark,
    company,
    dischargeLocation,
    firstRegistrationDate,
    insurancePolicyNumber,
    interventionArrivalDateTime,
    interventionCompletionDateTime,
    interventionRecievalDateTime,
    partner,
    paymentMethod,
    peopleCount,
    phoneNumber,
    registrationPlate,
    remark,
    vehicleModel,
    victimName
  } = data;

  if(additionalVehicleInfo) this.additionalVehicleInfo = additionalVehicleInfo;
  if(chassisNumber) this.chassisNumber = chassisNumber;
  if(checkoutRemark) this.checkoutRemark = checkoutRemark;
  if(dischargeLocation) this.dischargeLocation = dischargeLocation;
  if(firstRegistrationDate) this.firstRegistrationDate = firstRegistrationDate;
  if(insurancePolicyNumber) this.insurancePolicyNumber = insurancePolicyNumber;
  if(interventionArrivalDateTime) this.interventionArrivalDateTime = interventionArrivalDateTime;
  if(interventionCompletionDateTime) this.interventionCompletionDateTime = interventionCompletionDateTime;
  if(interventionRecievalDateTime) this.interventionRecievalDateTime = interventionRecievalDateTime;
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

InterventionSchema.statics.getOpenInterventions = () => {
  return Intervention.find({ interventionStatus: { $in: [ InterventionStatus.ASSIGNED.name, InterventionStatus.RECEIVED.name ] } });
};

InterventionSchema.statics.findOneById = (id) => {
  return Intervention.findOne({ _id: id });
};

const Intervention = mongoose.model('Intervention', InterventionSchema);

export default Intervention;
