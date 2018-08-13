import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  }
});

PartnerSchema.methods.fillFromFormData = function fillFromFormData(data) {
  const { address, contactNumber, name, vehicleType } = data;

  if(address) this.address = address;
  if(contactNumber) this.contactNumber = contactNumber;
  if(name) this.name = name;
  if(vehicleType) this.vehicleType = vehicleType;
};

PartnerSchema.statics.checkNameInUse = (name) => {
  return Partner.find({ name }).limit(1).then(partners => {
    if (partners[0]) {
      return Promise.reject('Name already in use');
    }
  });
};

PartnerSchema.statics.deleteOneByName = (name) => {
  return Partner.deleteOne({ name });
};

PartnerSchema.statics.findOneByName = (name) => {
  return Partner.findOne({ name });
};

const Partner = mongoose.model('Partner', PartnerSchema);

export default Partner;
